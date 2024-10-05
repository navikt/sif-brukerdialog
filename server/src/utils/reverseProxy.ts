import { getToken, requestTokenxOboToken } from '@navikt/oasis';
import { Express, NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config, { Service, verifyProxyConfigIsSet } from './serverConfig.js';
import { v4 as uuid } from 'uuid';

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
                console.info('Reverse proxyHandler added', proxy);
            } catch (e) {
                console.error('Error setting up reverse proxy for', key);
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
                return response.status(401).send();
            }
            const obo = await requestTokenxOboToken(token, scope);
            if (obo.ok) {
                request.headers['obo-token'] = obo.token;
                return next();
            } else {
                console.log('OBO-exchange failed', obo.error);
                return response.status(403).send();
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
                        console.log(`Access token var not present in session for scope ${scope}`);
                    }
                },
            },
        }),
    );
}
