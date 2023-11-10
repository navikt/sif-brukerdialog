/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const getAppSettings = require('./src/build/AppSettings.cjs');
const getDecorator = require('./src/build/decorator.cjs');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
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
    res.set('X-Correlation-ID', uuidv4());
    if (process.env.NAIS_CLIENT_ID !== undefined) {
        res.set('X-K9-Brukerdialog', process.env.NAIS_CLIENT_ID);
    }
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

const startServer = async (html) => {
    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (_req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (_req, res) => res.sendStatus(200));

    server.use(
        process.env.FRONTEND_API_PATH,
    );

    if (isDev) {
        const fs = require('fs');
        fs.writeFileSync(path.resolve(__dirname, 'index-decorated.html'), html);
        const vedleggMockStore = './dist/vedlegg';

        if (!fs.existsSync(vedleggMockStore)) {
            fs.mkdirSync(vedleggMockStore);
        }

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
