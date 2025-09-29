import { getToken, requestOboToken } from '@navikt/oasis';
import { Express, NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { v4 as uuid } from 'uuid';
import logger from './log.js';
import config, { Service, verifyProxyConfigIsSet } from './serverConfig.js';

type ProxyOptions = {
    ingoingUrl: string;
    outgoingUrl: string;
    scope: string;
};

const getCommitShaFromEnv = () => {
    const image = process.env.IMAGE || '';
    const parts = image.split('mono:');
    return parts.length === 2 ? parts[1] : undefined;
};

export function configureReverseProxyApi(app: Express) {
    Object.keys(config.proxies)
        .map((key) => ({ key, proxy: config.proxies[key as Service] }))
        .forEach(({ key, proxy }) => {
            try {
                verifyProxyConfigIsSet(key as Service);
                addProxyHandler(app, {
                    ingoingUrl: proxy.frontendPath,
                    outgoingUrl: proxy.apiUrl,
                    scope: proxy.apiScope,
                });
                logger.info(`Reverse proxyHandler added for ${key}: ${proxy.frontendPath} -> ${proxy.apiUrl}`);
            } catch (e) {
                logger.error(`Missing info setting up reverse proxy for ${key}`, e);
            }
        });
}

export function addProxyHandler(server: Express, { ingoingUrl, outgoingUrl, scope }: ProxyOptions) {
    server.use(
        ingoingUrl,
        async (request: Request, response: Response, next: NextFunction) => {
            if (process.env.NAIS_CLIENT_ID !== undefined) {
                request.headers['X-K9-Brukerdialog'] = process.env.NAIS_CLIENT_ID;
            }
            if (request.headers['X-Correlation-ID'] === undefined) {
                request.headers['X-Correlation-ID'] = uuid();
            }
            request.headers['X-Brukerdialog-Git-Sha'] = getCommitShaFromEnv();

            const token = getToken(request);
            if (!token) {
                logger.warning('No token found in proxy request');
                response.status(401).send();
                return;
            }
            const obo = await requestOboToken(token, scope);
            if (obo.ok) {
                request.headers['obo-token'] = obo.token;
                next();
            } else {
                logger.warning(`OBO-exchange failed for scope ${scope}: ${obo.error}`);
                response.status(403).send();
            }
        },
        createProxyMiddleware({
            target: outgoingUrl,
            changeOrigin: true,
            logger: console,
            on: {
                proxyReq: (proxyRequest, request) => {
                    const obo = request.headers['obo-token'];
                    if (obo) {
                        proxyRequest.removeHeader('obo-token');
                        proxyRequest.removeHeader('cookie');
                        proxyRequest.setHeader('Authorization', `Bearer ${obo}`);
                    } else {
                        logger.warning(`Access token not present in session for scope ${scope}`);
                    }
                },
            },
        }),
    );
}
