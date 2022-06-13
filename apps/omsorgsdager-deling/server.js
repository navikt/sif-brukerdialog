/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const compression = require('compression');
const helmet = require('helmet');
const getDecorator = require('./src/build/scripts/decorator');
const envSettings = require('./envSettings');

const server = express();
server.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

server.use(compression());
server.set('views', path.resolve(`${__dirname}/dist`));
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const verifyLoginUrl = () =>
    new Promise((resolve, reject) => {
        if (!process.env.LOGIN_URL) {
            reject();
        } else {
            resolve();
        }
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

const startServer = (html) => {
    server.use(`${process.env.PUBLIC_PATH}/dist/js`, express.static(path.resolve(__dirname, 'dist/js')));
    server.use(`${process.env.PUBLIC_PATH}/dist/css`, express.static(path.resolve(__dirname, 'dist/css')));
    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/dist/settings.js`, (req, res) => {
        res.set('content-type', 'application/javascript');
        res.send(`${envSettings()}`);
    });

    server.get(/^\/(?!.*dist).*$/, (req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

verifyLoginUrl()
    .then(getDecorator, () => {
        logError('LOGIN_URL is missing');
        process.exit(1);
    })
    .then(renderApp, (error) => {
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => logError('Failed to render app', error));
