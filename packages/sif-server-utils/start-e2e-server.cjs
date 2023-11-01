/* eslint-disable no-console */
const { getDecoratorAndServer } = require('./index.cjs');
const express = require('express');
const path = require('path');

const startServer = async ({ html, server }, dirname, publicPath) => {
    server.get(`${publicPath}/health/isAlive`, (_req, res) => res.sendStatus(200));
    server.get(`${publicPath}/health/isReady`, (_req, res) => res.sendStatus(200));
    server.use(`${publicPath}/assets`, express.static(path.resolve(dirname, 'dist/assets')));

    server.get(/^\/(?!.*api)(?!.*dist).*$/, (req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const startE2EServer = (appSettings, dirname) => {
    if (appSettings.PUBLIC_PATH === undefined) {
        throw 'Missing PUBLIC_PATH in appSettings';
    }
    getDecoratorAndServer(appSettings, dirname, false, true).then((props) =>
        startServer(props, dirname, appSettings.PUBLIC_PATH),
    );
};

module.exports = { startE2EServer };
