const os = require('os');
const fs = require('fs');
const express = require('express');
const server = express();

server.use(express.json());
server.use((req, res, next) => {
    const allowedOrigins = [
        'http://host.docker.internal:8090',
        'http://host.docker.internal:8080',
        'http://localhost:8090',
        'http://localhost:8080',
        'http://web:8090',
        'http://web:8080',
        'http://192.168.0.121:8090',
        'http://127.0.0.1:8080',
        '*',
    ];
    const requestOrigin = req.headers.origin;
    if (allowedOrigins.indexOf(requestOrigin) >= 0) {
        res.set('Access-Control-Allow-Origin', requestOrigin);
    }

    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Access-Control-Allow-Headers', ['content-type', 'X-Brukerdialog-Git-Sha']);
    res.set('Access-Control-Allow-Methods', ['GET', 'POST', 'DELETE', 'PUT']);
    res.set('Access-Control-Allow-Credentials', true);
    next();
});

const MELLOMLAGRING_JSON = `${os.tmpdir()}/endringsmelding-pleiepenger-mellomlagring.json`;

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
const soker = 'soker1';

const sakFileName = `sak-mock.json`;
const søkerFileName = `søker-mock.json`;
const arbeidsgiverFileName = `arbeidsgiver-mock.json`;
const organisasjonFileName = `organisasjon-mock.json`;

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
    const port = 8099;

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));

    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.get('/login', (req, res) => {
        setTimeout(() => {
            res.sendStatus(404);
        }, 2000);
    });

    server.get('/oppslag/soker?*', (req, res) => {
        setTimeout(() => {
            readMockFile(søkerFileName, res);
        }, 200);
    });

    server.get('/api/innsyn/sak', (req, res) => {
        setTimeout(() => {
            readMockFile(sakFileName, res);
        }, 200);
    });

    server.get('/oppslag/arbeidsgiver', (req, res) => {
        readMockFile(arbeidsgiverFileName, res);
    });

    server.get('/oppslag/organisasjoner', (req, res) => {
        readMockFile(organisasjonFileName, res);
    });

    server.post('/pleiepenger-sykt-barn/endringsmelding/innsending', (req, res) => {
        const body = req.body;
        // eslint-disable-next-line no-console
        console.log('[POST] body', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 2500);
    });

    server.post('/soknad-logget-ut', (req, res) => {
        res.sendStatus(401);
    });

    server.get('/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        if (existsSync(MELLOMLAGRING_JSON)) {
            const body = readFileSync(MELLOMLAGRING_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });

    server.post('/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });

    server.put('/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });

    server.delete('/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(200);
    });

    server.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Express mock-api server listening on port: ${port}`);
    });
};

startExpressServer();
