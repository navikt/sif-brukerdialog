/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const os = require('os');
const fs = require('fs');

const barnMock = require('./mock-data/barn.json');
const søkerMock = require('./mock-data/soker.json');

const server = express();

server.use(express.json());
server.use(
    helmet({
        contentSecurityPolicy: true,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }),
);

server.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.set('Access-Control-Allow-Methods', ['GET', 'POST', 'DELETE', 'PUT']);
    res.set('Access-Control-Allow-Headers', ['content-type', 'x-brukerdialog-git-sha']);
    res.set('Access-Control-Allow-Credentials', true);

    next();
});

const MELLOMLAGRING_JSON = `${os.tmpdir()}/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn-mellomlagring.json`;

const isJSON = (str) => {
    try {
        return JSON.parse(str) && !!str;
    } catch (e) {
        return false;
    }
};

const writeFileAsync = async (path, text) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, text, 'utf8', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const readFileSync = (path) => {
    return fs.readFileSync(path, 'utf8');
};

const existsSync = (path) => fs.existsSync(path);

const startExpressServer = () => {
    const port = process.env.PORT || 8089;

    /** --- Get søker data fra api ---------- */

    server.get('/oppslag/soker', (req, res) => {
        setTimeout(() => {
            res.send(søkerMock);
        }, 401);
    });

    server.get('/oppslag/barn', (req, res) => {
        setTimeout(() => {
            res.send(barnMock);
        }, 200);
    });

    // Tomt barn
    /* server.get('/oppslag/barn', (req, res) => {
        setTimeout(() => {
            res.send({});
        }, 200);
    });*/

    /** --- Send søknad ---------- */

    server.post('/omsorgspenger-midlertidig-alene/innsending', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 2500);
    });

    /** --- Mellomlagring ---------- */

    server.get('/mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE', (req, res) => {
        if (existsSync(MELLOMLAGRING_JSON)) {
            const body = readFileSync(MELLOMLAGRING_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });

    server.put('/mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });

    server.post('/mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });

    server.delete('/mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE', (req, res) => {
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(200);
    });

    server.listen(port, () => {
        console.log(`Express mock-api server listening on port: ${port}`);
    });
};

startExpressServer();
