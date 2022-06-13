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

const MELLOMLAGRING_JSON = `${os.tmpdir()}/omsorgsdager-deling-mellomlagring.json`;

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
    fødselsnummer: '30086421581',
    fornavn: 'GODSLIG',
    mellomnavn: null,
    etternavn: 'KRONJUVEL',
    kontonummer: '17246746060',
};

const barnMock = {
    barn: [
        { fødselsdato: '1990-01-02', fornavn: 'Barn', mellomnavn: 'Barne', etternavn: 'Barnesen', aktørId: '1' },
        { fødselsdato: '1990-01-02', fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
    ],
};

const barnMock2 = {
    barn: [
        {
            fødselsdato: '2008-03-01',
            fornavn: 'GØYAL',
            mellomnavn: null,
            etternavn: 'LAPP',
            aktørId: '1097566908089',
        },
    ],
};

const startExpressServer = () => {
    const port = process.env.PORT || 8089;

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));

    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.get('/login', (req, res) => {
        setTimeout(() => {
            res.sendStatus(404);
        }, 2000);
    });

    server.get('/soker', (req, res) => {
        setTimeout(() => {
            res.send(søkerMock);
        }, 200);
    });

    server.get('/soker-umyndig', (req, res) => {
        res.sendStatus(451);
    });
    server.get('/soker-not-logged-in', (req, res) => {
        res.sendStatus(401);
    });
    server.get('/soker-err', (req, res) => {
        setTimeout(() => {
            res.sendStatus(501);
        }, 200);
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

    server.get('/barn', (req, res) => {
        setTimeout(() => {
            res.send(barnMock);
        }, 200);
    });

    server.get('/barn2', (req, res) => {
        setTimeout(() => {
            res.send(barnMock2);
        }, 200);
    });

    server.get('/barn-err', (req, res) => {
        setTimeout(() => {
            res.sendStatus(501);
        }, 200);
    });

    server.get('/soker-logget-ut', (req, res) => {
        res.sendStatus(401);
    });

    server.post('/melding/dele-dager', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 2500);
    });

    // Vanlig deling av dager
    server.post('/melding/overforing', (req, res) => {
        const body = req.body;
        console.log('[POST] - dele med ektefelle/samboer', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 2500);
    });

    // Fordeling med samværsforelder
    server.post('/melding/fordeling', (req, res) => {
        const body = req.body;
        console.log('[POST] - fordeling samvær', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 2500);
    });

    // Koronaoverføring
    server.post('/melding/koronaoverforing', (req, res) => {
        const body = req.body;
        console.log('[POST] - koronaoverføring', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 2500);
    });

    server.post('/melding/dele-dager-err', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            res.sendStatus(501);
        }, 2000);
    });

    server.post('/soknad-logget-ut', (req, res) => {
        res.sendStatus(401);
    });

    server.get('/mellomlagring', (req, res) => {
        if (existsSync(MELLOMLAGRING_JSON)) {
            const body = readFileSync(MELLOMLAGRING_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });

    server.post('/mellomlagring', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });

    server.put('/mellomlagring', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });

    server.delete('/mellomlagring', (req, res) => {
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(200);
    });

    server.listen(port, () => {
        console.log(`Express mock-api server listening on port: ${port}`);
    });
};

startExpressServer();
