const express = require('express');
const mustacheExpress = require('mustache-express');
const compression = require('compression');
const envSettings = require('./envSettings');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const Promise = require('promise');
const helmet = require('helmet');
const path = require('path');

const server = express();
server.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    })
);
server.use((req, res, next) => {
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
    next();
});
server.use(compression());
server.use(cookieParser());
server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

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

const startServer = (html) => {
    server.use(`${process.env.PUBLIC_PATH}/dist/js`, express.static(path.resolve(__dirname, 'dist/js')));
    server.use(`${process.env.PUBLIC_PATH}/distjs`, express.static(path.resolve(__dirname, 'dist/js')));
    server.use(`${process.env.PUBLIC_PATH}/dist/css`, (req, res, next) => {
        const requestReferer = req.headers.referer;
        if (requestReferer !== undefined && requestReferer === 'https://nav.psplugin.com/') {
            res.set('cross-origin-resource-policy', 'cross-origin');
        }
        next();
    });
    server.use(`${process.env.PUBLIC_PATH}/dist/css`, express.static(path.resolve(__dirname, 'dist/css')));
    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/dist/settings.js`, (req, res) => {
        res.set('content-type', 'application/javascript');
        res.send(`${envSettings()}`);
    });
    server.get(`/dist/settings.js`, (req, res) => {
        res.set('content-type', 'application/javascript');
        res.send(`${envSettings()}`);
    });

    server.get(/^\/(?!.*api)(?!.*dist).*$/, (req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`App listening on port: ${port}`);
    });
};

// eslint-disable-next-line no-console
const logError = (errorMessage, details) => console.log(errorMessage, details);

const getDecoratorMock = async () => {
    return fs.readFileSync('./e2e/server/mock-decorator.html', 'utf8');
};

getDecoratorMock()
    .then(renderApp, (error) => {
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => logError('Failed to render app', error));
