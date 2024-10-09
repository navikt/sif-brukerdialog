/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const busboyCons = require('busboy');
const os = require('os');
const fs = require('fs');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(
    helmet({
        contentSecurityPolicy: true,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }),
);

server.use(
    cors({
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
        allowedHeaders: ['content-type', 'X-Brukerdialog-Git-Sha', 'x_correlation_id'],
        credentials: true,
    }),
);
server.options('*', cors());

const MELLOMLAGRING_JSON = `${os.tmpdir()}/omsorgspengesoknad-mellomlagring.json`;

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

const mockPath = `${__dirname}/data`;
const deltaker = 'deltaker';

const readMockFile = (file, responseObject) => {
    const filePath = `${mockPath}/${soker}/${file}`;
    if (existsSync(filePath)) {
        const body = readFileSync(filePath);
        responseObject.send(JSON.parse(body));
    } else {
        responseObject.send({});
    }
};

const startExpressServer = () => {
    const port = process.env.PORT || 8099;

    server.get('/veileder/register/hent/alle', (req, res) => {
        setTimeout(() => {
            readMockFile(deltakelser, res);
        }, 250);
    });

    server.post('/veileder/register/legg-til', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        const response = {
            ...req.body,
        };
        console.log(response);
        setTimeout(() => {
            res.status(200).send(response);
        }, 50);
    });

    server.put('/veileder/register/oppdater/:id', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 2500);
    });

    server.delete('/veileder/register/fjern/:id', (req, res) => {
        res.sendStatus(200);
    });

    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startExpressServer();
