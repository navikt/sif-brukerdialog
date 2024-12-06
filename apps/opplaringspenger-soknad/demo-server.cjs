const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr/index.js');
const express = require('express');
const server = express();
server.use(express.json());
const path = require('path');
const mustacheExpress = require('mustache-express');
const compression = require('compression');

server.disable('x-powered-by');

server.use(compression());

require('dotenv').config();
server.set('views', `${__dirname}`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'no-referrer');
    res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
    next();
});

const setupAndServeHtml = async (app) => {
    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./demo', 'index.html');

    const html = await injectDecorator(spaFilePath);

    const envs = {
        ENV: `${process.env.ENV}`,
        APP_VERSION: `${process.env.APP_VERSION}`,
        PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
        GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
        SIF_PUBLIC_APPSTATUS_DATASET: `${process.env.SIF_PUBLIC_APPSTATUS_DATASET}`,
        SIF_PUBLIC_APPSTATUS_PROJECT_ID: `${process.env.SIF_PUBLIC_APPSTATUS_PROJECT_ID}`,
        SIF_PUBLIC_DEKORATOR_URL: `${process.env.SIF_PUBLIC_DEKORATOR_URL}`,
        SIF_PUBLIC_LOGIN_URL: `${process.env.SIF_PUBLIC_LOGIN_URL}`,
        SIF_PUBLIC_MINSIDE_URL: `${process.env.SIF_PUBLIC_MINSIDE_URL}`,
        SIF_PUBLIC_AMPLITUDE_API_KEY: `${process.env.SIF_PUBLIC_AMPLITUDE_API_KEY}`,
        SIF_PUBLIC_USE_AMPLITUDE: `${process.env.SIF_PUBLIC_USE_AMPLITUDE}`,
        SIF_PUBLIC_FEATURE_NYNORSK: `${process.env.SIF_PUBLIC_FEATURE_NYNORSK}`,
        SIF_PUBLIC_USE_AMPLITUDE: `${process.env.SIF_PUBLIC_USE_AMPLITUDE}`,
        K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,
        K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE}`,
        K9_BRUKERDIALOG_PROSESSERING_API_URL: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL}`,
        K9_SAK_INNSYN_FRONTEND_PATH: `${process.env.K9_SAK_INNSYN_FRONTEND_PATH}`,
        K9_SAK_INNSYN_API_SCOPE: `${process.env.K9_SAK_INNSYN_API_SCOPE}`,
        K9_SAK_INNSYN_API_URL: `${process.env.K9_SAK_INNSYN_API_URL}`,
    };

    const renderedHtml = html.replaceAll('{{{APP_SETTINGS}}}', JSON.stringify(envs));

    app.get(/^\/(?!.*dist).*$/, async (_request, response) => {
        return response.send(renderedHtml);
    });
};

async function injectDecorator(filePath) {
    return injectDecoratorServerSide({
        env: 'prod',
        filePath,
        params: {
            simple: true,
            enforceLogin: false,
        },
    });
}

const startServer = async () => {
    server.use(`/assets`, express.static(path.resolve(path.resolve('demo'), 'assets')));
    server.use(`/mockServiceWorker.js`, express.static(path.resolve(path.resolve('./'), 'mockServiceWorker.js')));

    setupAndServeHtml(server);

    const port = process.env.PORT || 8080;

    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startServer();
