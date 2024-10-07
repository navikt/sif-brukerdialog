/* eslint-disable no-console */
const express = require('express');
const server = express();
const path = require('path');
const mustacheExpress = require('mustache-express');
const getAppSettings = require('./e2e/server/AppSettings.cjs');
const getDecorator = require('./e2e/server/decorator.cjs');
const compression = require('compression');

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
    server.use(`${process.env.PUBLIC_PATH}/assets`, express.static(path.resolve(__dirname, './dist/assets')));

    server.get('/mockServiceWorker.js', (req, res) => {
        const filePath = path.join(__dirname, 'mockServiceWorker.js');
        res.sendFile(filePath);
    });

    server.get(/^\/(?!.*api)(?!.*dist).*$/, (req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

const appSettings = getAppSettings(true);
console.log('appSettings', appSettings);
console.info(appSettings);

getDecorator(appSettings)
    .then(renderApp, (error) => {
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => logError('Failed to render app', error));
