import { getToken, requestOboToken } from '@navikt/oasis';
import { Express, NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from './log.js';
import config, { Service, verifyProxyConfigIsSet } from './serverConfig.js';
import { CORRELATION_ID_HEADER } from './correlationId.js';

type ProxyOptions = {
    ingoingUrl: string;
    outgoingUrl: string;
    scope: string;
};

const BLOCKED_PATHS = ['/internal', '/actuator', '/admin'];

// Lovlige API-stier inneholder aldri disse tegnene. Avvis i stedet for å gjette hvordan backend normaliserer.
const SUSPICIOUS_PATH = /[%\\;]|\/\.\.?(\/|$)/;

const isBlockedPath = (url: string, blockedPaths: string[]): boolean => {
    let path: string;
    try {
        path = decodeURIComponent(url.split('?')[0]).toLowerCase();
    } catch {
        return true;
    }
    if (SUSPICIOUS_PATH.test(path)) return true;
    const normalized = path.replace(/\/{2,}/g, '/');
    return blockedPaths.some((blocked) => normalized === blocked || normalized.startsWith(`${blocked}/`));
};

const getCommitShaFromEnv = () => {
    const image = process.env.IMAGE || '';
    const parts = image.split('mono:');
    return parts.length === 2 ? parts[1] : undefined;
};

export function configureReverseProxyApi(app: Express, services: Service[]) {
    services.forEach((key) => {
        verifyProxyConfigIsSet(key);
        const proxy = config.proxies[key];
        addProxyHandler(app, {
            ingoingUrl: proxy.frontendPath,
            outgoingUrl: proxy.apiUrl,
            scope: proxy.apiScope,
        });
        logger.info(`Reverse proxyHandler added for ${key}: ${proxy.frontendPath} -> ${proxy.apiUrl}`);
    });
}

export function addProxyHandler(server: Express, { ingoingUrl, outgoingUrl, scope }: ProxyOptions) {
    server.use(
        ingoingUrl,
        async (request: Request, response: Response, next: NextFunction) => {
            // request.url er relativ til ingoingUrl, altså stien som sendes videre til backend
            if (isBlockedPath(request.url, BLOCKED_PATHS)) {
                logger.warning(
                    `Blocked proxy path - ${request.method} ${request.originalUrl.split('?')[0]} (correlationId: ${request.headers[CORRELATION_ID_HEADER]})`,
                );
                response.status(404).send();
                return;
            }

            if (process.env.NAIS_CLIENT_ID !== undefined) {
                request.headers['X-K9-Brukerdialog'] = process.env.NAIS_CLIENT_ID;
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
            // Under ingress-nginx sin standard på 60 s, slik at vi svarer 504 og logger før ingress kutter
            proxyTimeout: 55_000,
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
