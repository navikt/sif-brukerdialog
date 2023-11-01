/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const { getAppSettings } = require('./src/build/AppSettings.cjs');
const { getDecoratorAndServer, createApiUrlProxyMiddleware, setupViteDevServer } = require('@navikt/sif-server-utils');

require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';

const startServer = async ({ html, server }) => {
    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (_req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (_req, res) => res.sendStatus(200));

    server.use(
        process.env.FRONTEND_API_PATH,
        createApiUrlProxyMiddleware(process.env.API_URL, process.env.FRONTEND_API_PATH, process.env.NAIS_CLIENT_ID),
    );

    if (isDev) {
        setupViteDevServer(server, __dirname, html);
    } else {
        server.use(`${process.env.PUBLIC_PATH}/assets`, express.static(path.resolve(__dirname, 'dist/assets')));
        server.get(/^\/(?!.*api)(?!.*dist).*$/, (_req, res) => {
            res.send(html);
        });
    }

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

getDecoratorAndServer(getAppSettings(), __dirname, isDev).then(startServer);
