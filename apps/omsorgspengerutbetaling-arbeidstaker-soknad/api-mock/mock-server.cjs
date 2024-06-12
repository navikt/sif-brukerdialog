/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const os = require('os');
const fs = require('fs');
const busboyCons = require('busboy');

const søkerMock = require('./mock-data/soker.json');
const barnMock = require('./mock-data/barn.json');
const arbeidsgivereMock = require('./mock-data/arbeidsgiver.json');

const server = express();

server.use(express.json());
server.use(
    helmet({
        contentSecurityPolicy: false,
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

const MELLOMLAGRING_JSON = `${os.tmpdir()}/omsorgspengerutbetaling-arbeidstaker-soknad-mellomlagring.json`;

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

const startServer = () => {
    const port = process.env.PORT || 8089;

    /** --- Get søker data fra api ---------- */

    server.get('/oppslag/soker', (req, res) => {
        res.send(søkerMock);
    });

    server.get(`/oppslag/barn`, (req, res) => {
        setTimeout(() => {
            res.send(barnMock);
        }, 200);
    });

    server.get('/oppslag/arbeidsgiver', (req, res) => {
        // Kan brukes for å se spinneren på arbeidstaker steget.
        // setTimeout(() => {
        //     res.send(arbeidsgivereMock);
        // }, 5000)
        res.send(arbeidsgivereMock);
        // res.send(arbeidsgiverMock);
        // res.send(ingenArbeidsgivererMock);
    });

    /** --- Send søknad ---------- */

    server.post('/omsorgspenger-utbetaling-arbeidstaker/innsending', (req, res) => {
        console.log(req.body);
        res.sendStatus(200);
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

    server.get('/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER', (req, res) => {
        if (existsSync(MELLOMLAGRING_JSON)) {
            const body = readFileSync(MELLOMLAGRING_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });
    server.post('/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.put('/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.delete('/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER', (req, res) => {
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(202);
    });

    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startServer();
