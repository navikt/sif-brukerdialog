const path = require('path');
const process = require('process');
const express = require('express');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const envSettings = require('./envSettings');

const server = express();
server.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
server.use(compression());
server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());
server.use(`${process.env.PUBLIC_PATH}/dist/js`, express.static(path.resolve(__dirname, 'dist/js')));
server.use(`${process.env.PUBLIC_PATH}/dist/css`, express.static(path.resolve(__dirname, 'dist/css')));

server.get(`${process.env.PUBLIC_PATH}/dist/settings.js`, (req, res) => {
    res.set('content-type', 'application/javascript');
    res.send(`${envSettings()}`);
});
server.get(`/dist/settings.js`, (req, res) => {
    res.set('content-type', 'application/javascript');
    res.send(`${envSettings()}`);
});

const routerHealth = express.Router();
routerHealth.get(`${process.env.PUBLIC_PATH}/isAlive`, (req, res) => res.sendStatus(200));
routerHealth.get(`${process.env.PUBLIC_PATH}/isReady`, (req, res) => res.sendStatus(200));
server.use(`${process.env.PUBLIC_PATH}/health`, routerHealth);

const renderApp = () =>
    new Promise((resolve, reject) => {
        server.render('index.html', (err, html) => {
            if (err) {
                reject(html);
            } else {
                resolve(html);
            }
        });
    });

const startServer = (html) => {
    const routeSoknad = express.Router();
    routeSoknad.use((req, res) => {
        res.send(html);
    });
    server.use(`${process.env.PUBLIC_PATH}/soknad`, routeSoknad);
    server.use(`${process.env.PUBLIC_PATH}/`, routeSoknad);

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`Server-test Web App listening on port: ${port}`);
    });
};

const startExpressWebServer = async () => {
    if (!process.env.API_URL) {
        console.error('API_URL env var must be defined!');
        process.exit(1);
    }
    try {
        const html = await renderApp();
        startServer(html);
    } catch (e) {
        console.error(e);
    }
};

startExpressWebServer();
