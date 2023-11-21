/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const getAppSettings = require('./src/build/AppSettings.cjs');
const getDecorator = require('./src/build/decorator.cjs');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const {createProxyMiddleware} = require('http-proxy-middleware');

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

server.set('views', `${__dirname}/dist`);
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
        createProxyMiddleware({
            target: process.env.API_URL,
            changeOrigin: true,
            pathRewrite: (path) => {
                return path.replace(process.env.FRONTEND_API_PATH, '');
            },
            secure: true,
            xfwd: true,
            logLevel: 'info',
        }),
    );

    server.use(`${process.env.PUBLIC_PATH}/assets`, express.static(path.resolve(__dirname, 'dist/assets')));
    server.get(/^\/(?!.*api)(?!.*dist).*$/, (_req, res) => {
        res.send(html);
    });

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
