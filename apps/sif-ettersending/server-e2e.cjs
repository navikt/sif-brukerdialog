/* eslint-disable no-console */
const AppSettings = require('./src/build/AppSettings.cjs');
const compression = require('compression');
const express = require('express');
const { getDecoratorAndStart } = require('@navikt/sif-server-utils');
const mustacheExpress = require('mustache-express');
const path = require('path');
const server = express();
require('dotenv').config();

server.use(express.json());
server.disable('x-powered-by');
server.use(compression());

server.set('views', path.resolve(`${__dirname}/dist`));

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

const startServer = async (html) => {
    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (_req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (_req, res) => res.sendStatus(200));
    server.use(`${process.env.PUBLIC_PATH}/assets`, express.static(path.resolve(__dirname, 'dist/assets')));

    server.get(/^\/(?!.*api)(?!.*dist).*$/, (req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

getDecoratorAndStart(AppSettings.getAppSettings(), server, startServer);
