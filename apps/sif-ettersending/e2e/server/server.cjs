/* eslint-disable no-console */
const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr/index.js');
const express = require('express');
const server = express();
const path = require('path');
const mustacheExpress = require('mustache-express');
const getAppSettings = require('../../mock/getAppSettings.cjs');
const compression = require('compression');
const getAppSettings = require('../../dev/AppSettings.cjs');

require('dotenv').config();

server.use(express.json());
server.disable('x-powered-by');
server.use(compression());

server.set('views', path.resolve(`${__dirname}/../../dist`));

server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use((_req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'no-referrer');
    res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
    next();
});

async function injectDecorator(filePath) {
    return injectDecoratorServerSide({
        env: 'dev',
        filePath,
        params: {
            enforceLogin: false,
            simple: true,
        },
    });
}

const startServer = async () => {
    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (_req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (_req, res) => res.sendStatus(200));
    server.use(`${process.env.PUBLIC_PATH}/assets`, express.static(path.resolve(__dirname, '../../dist/assets')));

    const indexHtmlPath = path.resolve(__dirname, '../../dist/index.html');

    const htmlWithDecoratorInjected = await injectDecorator(indexHtmlPath);

    const renderedHtml = htmlWithDecoratorInjected.replaceAll(
        '{{{APP_SETTINGS}}}',
        JSON.stringify({
            APP_VERSION: `${process.env.APP_VERSION}`,
            PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
            ...getAppSettings(),
        }),
    );

    server.get(/^\/(?!.*api)(?!.*dist).*$/, (req, res) => {
        res.send(renderedHtml);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startServer();
