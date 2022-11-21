/* eslint-disable no-console */
const os = require('os');
const fs = require('fs');
const express = require('express');
const server = express();
const busboyCons = require('busboy');

server.use(express.json());
server.use((req, res, next) => {
    const allowedOrigins = [
        'http://host.docker.internal:8080',
        'http://localhost:8080',
        'http://web:8080',
        'http://192.168.0.115:8080',
    ];
    const requestOrigin = req.headers.origin;
    if (allowedOrigins.indexOf(requestOrigin) >= 0) {
        res.set('Access-Control-Allow-Origin', requestOrigin);
    }

    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Access-Control-Allow-Headers', 'content-type');
    res.set('Access-Control-Allow-Methods', ['GET', 'POST', 'DELETE', 'PUT']);
    res.set('Access-Control-Allow-Credentials', true);
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

const søkerMock = {
    fornavn: 'Test',
    mellomnavn: undefined,
    etternavn: 'Testesen',
    fødselsnummer: '12345123456',
};

const startServer = () => {
    const port = process.env.PORT || 8090;

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.get('/oppslag/soker', (req, res) => {
        setTimeout(() => {
            res.send(søkerMock);
        }, 1000);
    });

    server.post('/ettersending/innsending', (req, res) => {
        res.sendStatus(200);
    });

    server.listen(port, () => {
        // console.log(`App listening on port: ${port}`);
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
        res.sendStatus(200);
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
        console.log(req.body);
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_SYKT_BARN_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.put('/mellomlagring/ETTERSENDING_PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        console.log(req.body);
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.put('/mellomlagring/ETTERSENDING_OMP', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        console.log(req.body);
        writeFileAsync(MELLOMLAGRING_OMP_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });

    server.delete('/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        // setTimeout(() => {
        //     writeFileAsync(MELLOMLAGRING_PLEIEPENGER_SYKT_BARN_JSON, JSON.stringify({}, null, 2));
        //     res.sendStatus(202);
        // }, 2000);
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_SYKT_BARN_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(202);
    });
    server.delete('/mellomlagring/ETTERSENDING_PLEIEPENGER_LIVETS_SLUTTFASE', (req, res) => {
        // setTimeout(() => {
        //     writeFileAsync(MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE_JSON, JSON.stringify({}, null, 2));
        //     res.sendStatus(202);
        // }, 2000);
        writeFileAsync(MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(202);
    });
    server.delete('/mellomlagring/ETTERSENDING_OMP', (req, res) => {
        // setTimeout(() => {
        //     writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify({}, null, 2));
        //     res.sendStatus(202);
        // }, 2000);
        writeFileAsync(MELLOMLAGRING_OMP_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(202);
    });
};

startServer();
