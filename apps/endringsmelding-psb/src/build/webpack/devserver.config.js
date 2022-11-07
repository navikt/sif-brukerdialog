const path = require('path');
const mustacheExpress = require('mustache-express');
const envSettings = require('../../../envSettings');
require('dotenv').config();

const configureDevServer = (decoratorFragments, port) => ({
    onBeforeSetupMiddleware: (devServer) => {
        devServer.app.engine('html', mustacheExpress());
        devServer.app.set('views', `${__dirname}/../../../dist`);
        devServer.app.set('view engine', 'mustache');

        devServer.app.get(`${process.env.PUBLIC_PATH}/dist/settings.js`, (req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`${envSettings()}`);
        });

        devServer.app.get(`${process.env.PUBLIC_PATH}/dist/mockServiceWorker.js`, (req, res) => {
            res.set('content-type', 'application/javascript');
            res.sendFile(path.resolve(`${__dirname}/../../../dist/mockServiceWorker.js`));
        });

        /** For å virke uten decorator */
        devServer.app.get(`/dist/settings.js`, (req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`${envSettings()}`);
        });
        devServer.app.get(`/dist/mockServiceWorker.js`, (req, res) => {
            res.set('content-type', 'application/javascript');
            res.sendFile(path.resolve(`${__dirname}/../../../dist/mockServiceWorker.js`));
        });
        devServer.app.get(`/mockServiceWorker.js`, (req, res) => {
            res.set('content-type', 'application/javascript');
            res.sendFile(path.resolve(`${__dirname}/../../../dist/mockServiceWorker.js`));
        });

        /** Resten */
        devServer.app.get(/^\/(?!.*dist).*$/, (req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });
    },
    port,
});

module.exports = configureDevServer;
