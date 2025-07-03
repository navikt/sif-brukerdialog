/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import mustacheExpress from 'mustache-express';
import compression from 'compression';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getAppSettings } from '../../mock/AppSettings.mjs';
import getDecorator from './decorator.mjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(express.json());
server.disable('x-powered-by');
server.use(compression());

server.set('views', path.resolve(__dirname, '../../dist'));
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
    console.log(process.env.PUBLIC_PATH);

    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (_req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (_req, res) => res.sendStatus(200));

    server.use(`${process.env.PUBLIC_PATH}/assets`, express.static(path.resolve(__dirname, '../../dist/assets')));

    server.get(/^\/(?!.*api)(?!.*dist).*$/, (_req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`✅ App listening on http://localhost:${port}`);
    });
};

const logError = (msg, details) => console.log(msg, details);

getDecorator(getAppSettings())
    .then(renderApp, (error) => {
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => logError('Failed to render app', error));
