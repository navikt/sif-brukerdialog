import { getToken, requestTokenxOboToken } from '@navikt/oasis';
import { Express, NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config, { verifyAllProxiesAreSet } from './serverConfig.js';

type ProxyOptions = {
    ingoingUrl: string;
    outgoingUrl: string;
    scope: string;
};

export function configureReverseProxyApi(app: Express) {
    try {
        verifyAllProxiesAreSet();
    } catch (e) {
        console.log('Error setting up reverse proxy', e);
    }

    Object.keys(config.proxies)
        .map((key) => config.proxies[key])
        .forEach((proxy) => {
            addProxyHandler(app, {
                ingoingUrl: proxy.frontendPath,
                outgoingUrl: proxy.apiUrl,
                scope: proxy.apiScope,
            });
        });
}

export function addProxyHandler(server: Express, { ingoingUrl, outgoingUrl, scope }: ProxyOptions) {
    server.use(
        ingoingUrl,
        async (request: Request, response: Response, next: NextFunction) => {
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