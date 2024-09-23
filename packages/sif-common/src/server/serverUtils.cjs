const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const jose = require('jose');
const { v4: uuidv4 } = require('uuid');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { exchangeToken } = require('./tokenx.cjs');
const mustacheExpress = require('mustache-express');
const {
    BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
    BRUKERDIALOG_PROSESSERING_SERVER_URL,
    BRUKERDIALOG_PROSESSERING_TOKENX_AUDIENCE,
    K9_SAK_INNSYN_FRONTEND_PATH,
    K9_SAK_INNSYN_SERVER_URL,
    K9_SAK_INNSYN_TOKENX_AUDIENCE,
    SIF_INNSYN_FRONTEND_PATH,
    SIF_INNSYN_SERVER_URL,
    SIF_INNSYN_TOKENX_AUDIENCE,
} = require('./serverEnv.cjs');

const isExpiredOrNotAuthorized = (token) => {
    if (token) {
        try {
            const exp = jose.decodeJwt(token).exp;
            return Date.now() >= exp * 1000;
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Feilet med dekoding av token: ', err);
            return true;
        }
    }
    return true;
};

const getRouterConfig = async (req, audience) => {
    {
        req.headers['X-Correlation-ID'] = uuidv4();

        if (process.env.NAIS_CLIENT_ID !== undefined) {
            req.headers['X-K9-Brukerdialog'] = process.env.NAIS_CLIENT_ID;
        }

        if (req.headers['authorization'] !== undefined) {
            const token = req.headers['authorization'].replace('Bearer ', '');
            if (isExpiredOrNotAuthorized(token)) {
                return undefined;
            }
            const exchangedToken = await exchangeToken(token, audience);
            if (exchangedToken != null && !exchangedToken.expired() && exchangedToken.access_token) {
                req.headers['authorization'] = `Bearer ${exchangedToken.access_token}`;
            }
        }
        return undefined;
    }
};

const createProxyMiddlewareForService = (server, frontendPath, backendUrl, audience) => {
    server.use(
        frontendPath,
        createProxyMiddleware({
            target: backendUrl,
            changeOrigin: true,
            pathRewrite: (path) => {
                return path.replace(frontendPath, '');
            },
            router: async (req) => getRouterConfig(req, audience),
            secure: true,
            xfwd: true,
            logLevel: 'info',
        }),
    );
};

const createProxyMiddlewares = (server) => {
    createProxyMiddlewareForService(
        server,
        BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
        BRUKERDIALOG_PROSESSERING_SERVER_URL,
        BRUKERDIALOG_PROSESSERING_TOKENX_AUDIENCE,
    );
    createProxyMiddlewareForService(
        server,
        K9_SAK_INNSYN_FRONTEND_PATH,
        K9_SAK_INNSYN_SERVER_URL,
        K9_SAK_INNSYN_TOKENX_AUDIENCE,
    );
    createProxyMiddlewareForService(
        server,
        SIF_INNSYN_FRONTEND_PATH,
        SIF_INNSYN_SERVER_URL,
        SIF_INNSYN_TOKENX_AUDIENCE,
    );
};

const initServer = () => {
    const server = express();
    server.use((_req, res, next) => {
        res.removeHeader('X-Powered-By');
        res.set('X-Frame-Options', 'SAMEORIGIN');
        res.set('X-XSS-Protection', '1; mode=block');
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('Referrer-Policy', 'no-referrer');
        res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
        next();
    });
    server.use(compression());
    server.use(cookieParser());
    server.set('view engine', 'mustache');
    server.engine('html', mustacheExpress());
    return server;
};
module.exports = {
    initServer,
    createProxyMiddlewares,
    getRouterConfig,
    createProxyMiddlewareForService,
    tokenXUtils: require('./tokenx.cjs'),
};
