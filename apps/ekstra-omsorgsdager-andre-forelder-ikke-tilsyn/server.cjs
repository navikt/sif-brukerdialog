/* eslint-disable no-console */
const { createProxyMiddleware } = require('http-proxy-middleware');
const { initTokenX, exchangeToken } = require('./tokenx.cjs');
const { v4: uuidv4 } = require('uuid');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const getAppSettings = require('./src/build/AppSettings.cjs');
const getDecorator = require('./src/build/decorator.cjs');
const jose = require('jose');
const mustacheExpress = require('mustache-express');
const path = require('path');
const RateLimit = require('express-rate-limit');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
    require('dotenv').config();
}

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

if (isDev) {
    require('dotenv').config();
    server.set('views', `${__dirname}`);
} else {
    server.set('views', `${__dirname}/dist`);
}
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const logError = (errorMessage, details) => console.log(errorMessage, details);

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
            const exchangedToken = await exchangeToken(token, audienceInnsyn);
            if (exchangedToken != null && !exchangedToken.expired() && exchangedToken.access_token) {
                req.headers['authorization'] = `Bearer ${exchangedToken.access_token}`;
            }
        }

        return undefined;
    }
};

const renderApp = (decoratorFragments) =>
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

const startServer = async (html) => {
    await setupTokenX();

    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (_req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (_req, res) => res.sendStatus(200));

    server.use(
        process.env.FRONTEND_API_PATH,
        createProxyMiddleware({
            target: process.env.API_URL,
            changeOrigin: true,
            pathRewrite: (path) => {
                return path.replace(process.env.FRONTEND_API_PATH, '');
            },
            router: async (req) => getRouterConfig(req, false),
            secure: true,
            xfwd: true,
            logLevel: 'info',
        }),
    );

    if (isDev) {
        const fs = require('fs');
        fs.writeFileSync(path.resolve(__dirname, 'index-decorated.html'), html);

        const vite = await require('vite').createServer({
            root: __dirname,
            server: {
                middlewareMode: true,
                port: 8080,
                open: './index-decorated.html',
            },
        });

        server.use(
            '/api',
            RateLimit({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 500, // max 100 requests per windowMs
                standardHeaders: 'draft-7',
                legacyHeaders: false,
            }),
        );

        server.get(/^\/(?!.*dist).*$/, (req, _res, next) => {
            const fullPath = path.resolve(__dirname, decodeURIComponent(req.path.substring(1)));
            const fileExists = fs.existsSync(fullPath);

            if ((!fileExists && !req.url.startsWith('/@')) || req.url === '/') {
                req.url = '/index-decorated.html';
            }
            next();
        });

        server.use(vite.middlewares);
    } else {
        server.use(`${process.env.PUBLIC_PATH}/assets`, express.static(path.resolve(__dirname, 'dist/assets')));
        server.get(/^\/(?!.*api)(?!.*dist).*$/, (_req, res) => {
            res.send(html);
        });
    }

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

getDecorator(getAppSettings())
    .then(renderApp, (error) => {
        console.log(error);
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => logError('Failed to render app', error));
