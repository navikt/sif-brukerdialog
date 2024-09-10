/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const busboyCons = require('busboy');
const os = require('os');
const fs = require('fs');

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
    res.set('Access-Control-Allow-Headers', ['content-type', 'X-Brukerdialog-Git-Sha', 'x_correlation_id']);
    res.set('Access-Control-Allow-Credentials', true);

    next();
});

const MELLOMLAGRING_JSON = `${os.tmpdir()}/pleiepenger-i-livets-sluttfase-mellomlagring.json`;

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

const søkerMock = require('./data/søker-mock.json');
const arbeidsgivereMock = require('./data/arbeidsgiver-mock.json');
// const frilansoppdragMock = require('./data/frilansoppdrag-mock.json');

const startExpressServer = () => {
    const port = process.env.PORT || 8099;

    server.get('/oppslag/soker', (req, res) => {
        setTimeout(() => {
            res.send(søkerMock);
        }, 250);
    });

    server.get('/oppslag/arbeidsgiver', (req, res) => {
        setTimeout(() => {
            // res.send({ ...arbeidsgivereMock, ...frilansoppdragMock, privatarbeidsgiver: [] });
            res.send({ ...arbeidsgivereMock, frilansoppdrag: [], privatarbeidsgiver: [] });
        }, 200);
    });

    /** --- Send søknad ---------- */

    server.post('/pleiepenger-livets-sluttfase/innsending', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 2500);
    });

    /** --- Vedlegg ---------- */

    server.post('/vedlegg', (req, res) => {
        res.set('Access-Control-Expose-Headers', 'Location');
        res.set('Location', 'nav.no');
        const busboy = busboyCons({ headers: req.headers });
        busboy.on('finish', () => {
            res.writeHead(200, {
                Location: 'http://localhost:8089/vedlegg/eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdG',
            });
            res.end();
        });
        req.pipe(busboy);
    });

    server.delete('/vedlegg', (req, res) => {
        res.sendStatus(200);
    });

    /** --- Mellomlagring ---------- */

    server.get('/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        if (existsSync(MELLOMLAGRING_JSON)) {
            const body = readFileSync(MELLOMLAGRING_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });
    server.post('/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;

        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.put('/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.delete('/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(200);
    });

    server.listen(port, () => {
        console.log(`Express mock-api server listening on port: ${port}`);
    });
};

startExpressServer();
