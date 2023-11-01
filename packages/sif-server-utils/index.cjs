const express = require('express');
const { v4: uuidv4 } = require('uuid');
const jose = require('jose');
const mustacheExpress = require('mustache-express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const RateLimit = require('express-rate-limit');

const getDecorator = require('./decorator.cjs');
const { initTokenX, exchangeToken } = require('./tokenx.cjs');

const isDev = process.env.NODE_ENV === 'development';

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

const getRouterConfig = async (req, audienceInnsyn) => {
    req.headers['X-Correlation-ID'] = uuidv4();
    if (process.env.NAIS_CLIENT_ID !== undefined) {
        req.headers['X-K9-Brukerdialog'] = process.env.NAIS_CLIENT_ID;
    }
    if (req.headers['authorization'] !== undefined) {
        const token = req.headers['authorization'].replace('Bearer ', '');
        if (isExpiredOrNotAuthorized(token)) {
            return undefined;
        }
        const exchangedToken = await exchangeToken(token, audienceInnsyn);
        if (exchangedToken != null && !exchangedToken.expired() && exchangedToken.access_token) {
            req.headers['authorization'] = `Bearer ${exchangedToken.access_token}`;
        }
    }
    return undefined;
};

const renderApp = (decoratorFragments, server) =>
    new Promise((resolve, reject) => {
        server.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const setupTokenX = async () => {
    if (isDev) {
        return Promise.resolve();
    }
    return Promise.all([initTokenX()]);
};

const getDecoratorAndServer = async (AppSettings, dirName) => {
    const server = getSifServer(dirName);
    return getDecorator(AppSettings)
        .then(
            (decoratorFragments) => renderApp(decoratorFragments, server),
            (error) => {
                console.log('Failed to get decorator', error);
                process.exit(1);
            },
        )
        .then(
            async (html) => {
                await setupTokenX();
                return {
                    html,
                    server,
                };
            },
            (error) => console.log('Failed to render app', error),
        );
};

const getSifServer = (dirname) => {
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
    server.engine('html', mustacheExpress());
    if (isDev) {
        server.set('views', `${dirname}`);
    } else {
        server.set('views', `${dirname}/dist`);
    }
    server.set('view engine', 'mustache');

    if (isDev) {
        server.use(
            '/api',
            RateLimit({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 500, // max 100 requests per windowMs
                standardHeaders: 'draft-7',
                legacyHeaders: false,
            }),
        );
    }

    return server;
};

module.exports = {
    getDecoratorAndServer,
    getRouterConfig,
};
