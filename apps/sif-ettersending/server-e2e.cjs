/* eslint-disable no-console */
const { getAppSettings } = require('./src/build/AppSettings.cjs');
const { getDecoratorAndServer } = require('@navikt/sif-server-utils');
const express = require('express');
const path = require('path');

require('dotenv').config();

const startServer = async ({ html, server }) => {
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

getDecoratorAndServer(getAppSettings(), __dirname, false, true).then(startServer);
