const express = require('express');
const helmet = require('helmet');
const busboyCons = require('busboy');
const os = require('os');
const fs = require('fs');

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
    res.set('Access-Control-Allow-Headers', ['content-type', 'X-Brukerdialog-Git-Sha']);

    next();
});

const MELLOMLAGRING_PLEIEPENGER_SYKT_BARN_JSON = `${os.tmpdir()}/sif-ettersending-pp-mellomlagring.json`;
const MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE_JSON = `${os.tmpdir()}/sif-ettersending-pils-mellomlagring.json`;
const MELLOMLAGRING_OMP_JSON = `${os.tmpdir()}/sif-ettersending-omp-mellomlagring.json`;

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

const RESPONSE_DELAY = 200;

const søkerMock = {
    fornavn: 'Test',
    mellomnavn: undefined,
    etternavn: 'Testesen',
    fødselsnummer: '17458209871',
};

const barnMock = {
    barn: [
        {
            fornavn: 'ALFABETISK',
            etternavn: 'FAGGOTT',
            aktørId: '2811762539343',
            fødselsdato: '2019-06-08',
            fødselsnummer: '08861999573',
        },
        {
            fornavn: 'Barn',
            mellomnavn: 'Barne',
            etternavn: 'Barnesen',
            fødselsdato: '2020-04-20',
            aktørId: '123',
        },
        { fødselsdato: '2015-01-02', fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
    ],
};

const startServer = () => {
    const port = process.env.PORT || 8089;

    server.get('/oppslag/soker', (req, res) => {
        setTimeout(() => {
            res.send(søkerMock);
        }, RESPONSE_DELAY);
    });

    server.get('/oppslag/barn', (req, res) => {
        setTimeout(() => {
            res.send(barnMock);
        }, RESPONSE_DELAY);
    });

    server.post('/ettersending/innsending', (req, res) => {
        setTimeout(() => {
            res.sendStatus(200);
        }, RESPONSE_DELAY);
    });

    server.post('/vedlegg', (req, res) => {
        res.set('Access-Control-Expose-Headers', 'Location');
        res.set('Location', 'nav.no');
        const busboy = busboyCons({ headers: req.headers });
        busboy.on('finish', () => {
            res.writeHead(200, { Location: '/vedlegg' });
            res.end();
        });
        req.pipe(busboy);
    });

    server.delete('/vedlegg', (req, res) => {
        res.sendStatus(200);
    });

    server.get('/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        if (existsSync(MELLOMLAGRING_PLEIEPENGER_SYKT_BARN_JSON)) {
            const body = readFileSync(MELLOMLAGRING_PLEIEPENGER_SYKT_BARN_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });
    server.get('/mellomlagring/ETTERSENDING_PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        if (existsSync(MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE_JSON)) {
            const body = readFileSync(MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });
    server.get('/mellomlagring/ETTERSENDING_OMP', (req, res) => {
        if (existsSync(MELLOMLAGRING_OMP_JSON)) {
            const body = readFileSync(MELLOMLAGRING_OMP_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });
    server.post('/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_SYKT_BARN_JSON, JSON.stringify(jsBody, null, 2));
        setTimeout(() => {
            res.sendStatus(200);
        }, RESPONSE_DELAY);
    });
    server.post('/mellomlagring/ETTERSENDING_PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.post('/mellomlagring/ETTERSENDING_OMP', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_OMP_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });

    server.put('/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_SYKT_BARN_JSON, JSON.stringify(jsBody, null, 2));
        setTimeout(() => {
            res.sendStatus(200);
        }, RESPONSE_DELAY);
    });
    server.put('/mellomlagring/ETTERSENDING_PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.put('/mellomlagring/ETTERSENDING_OMP', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_OMP_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });

    server.delete('/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_SYKT_BARN_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(202);
    });
    server.delete('/mellomlagring/ETTERSENDING_PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(202);
    });
    server.delete('/mellomlagring/ETTERSENDING_OMP', (req, res) => {
        writeFileAsync(MELLOMLAGRING_OMP_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(202);
    });

    server.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`App listening on port: ${port}`);
    });
};

startServer();
