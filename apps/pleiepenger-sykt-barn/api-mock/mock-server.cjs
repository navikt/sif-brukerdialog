const _ = require('lodash');
const busboyCons = require('busboy');
const express = require('express');
const fs = require('fs');
const os = require('os');
const process = require('process');
const { v4: uuidv4 } = require('uuid');

const platformNIC = () => {
    const interfaces = os.networkInterfaces();
    switch (process.platform) {
        case 'darwin':
            return interfaces.lo0;
        case 'linux':
            if (interfaces.ens192) return interfaces.ens192;
            if (interfaces.eno16780032) return interfaces.eno16780032;
            return interfaces.lo;
        default:
            return interfaces.Ethernet0 ? interfaces.Ethernet0 : interfaces['Wi-Fi'];
    }
};
const getIpAdress = () => {
    const nic = platformNIC();
    const ipv4 = _.find(nic, (item) => item.family === 'IPv4');
    return ipv4.address;
};

const server = express();

server.use(express.json());
server.use((req, res, next) => {
    const allowedOrigins = [
        'http://host.docker.internal:8080',
        'https://pleiepengesoknad-mock.nais.oera.no',
        'http://localhost:8080',
        'http://web:8080',
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

const søkerMock = {
    fornavn: 'Test',
    mellomnavn: undefined,
    etternavn: 'Testesen',
    fødselsnummer: '23058916765',
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
        { fødselsdato: '2020-04-20', fornavn: 'Barn', mellomnavn: 'Barne', etternavn: 'Barnesen', aktørId: '123' },
        { fødselsdato: '2015-01-02', fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
    ],
};

const privatArbeidsgiverMock = {
    offentligIdent: '123',
    navn: 'Jon Jonsen',
    ansattFom: '2021-01-01',
    ansattTom: '2021-12-31',
};
const frilansoppdrag = {
    type: 'type oppdrag',
    organisasjonsnummer: '991012133',
    navn: 'Hurdal frilanssenter',
    ansattFom: '2022-01-01',
    ansattTom: '2022-01-15',
};
const frilansoppdrag2 = {
    type: 'type oppdrag',
    organisasjonsnummer: '991012134',
    navn: 'Svandalen frilanssenter',
    ansattFom: '2022-01-01',
    ansattTom: '2022-01-15',
};

const arbeidsgivereMock = {
    organisasjoner: [
        { navn: 'SJOKKERENDE ELEKTRIKER', organisasjonsnummer: '947064649', ansattFom: '2002-04-20' },
        // { navn: 'ROLIG SVANE', organisasjonsnummer: '947064642', ansattFom: '2016-12-01' },
    ],
    // frilansoppdrag: [frilansoppdrag, frilansoppdrag2],
    frilansoppdrag: [],
    privatarbeidsgiver: [],
};

const MELLOMLAGRING_JSON = `${os.tmpdir()}/pleiepenger-sykt-barn-mellomlagring.json`;

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

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.get('/oppslag/arbeidsgiver', (req, res) => {
        // setTimeout(() => {
        res.send(arbeidsgivereMock);
        // }, 800);
    });

    server.get('/oppslag/soker', (req, res) => {
        res.send(søkerMock);
    });

    server.get('/oppslag/soker-umyndig', (req, res) => {
        res.sendStatus(451);
    });

    server.post('/vedlegg', (req, res) => {
        res.set('Access-Control-Expose-Headers', 'Location');
        res.set('Location', 'nav.no');
        const busboy = busboyCons({ headers: req.headers });
        busboy.on('finish', () => {
            res.writeHead(200, {
                Location: `http://localhost:8083/vedlegg/${uuidv4()}`,
            });
            res.end();
        });
        req.pipe(busboy);
    });

    server.get('/oppslag/barn', (req, res) => res.send(barnMock));

    //Test uten barn
    // server.get('/oppslag/barn', (req, res) => res.send({ barn: [] }));

    server.post('/pleiepenger-sykt-barn/innsending', (req, res) => {
        res.sendStatus(200);
    });
    // server.post('/pleiepenger-sykt-barn/innsending', (req, res) => {
    server.post('/pleiepenger-sykt-barn/innsending-feil-parametre', (req, res) => {
        res.status(400).send({
            type: '/problem-details/invalid-request-parameters',
            title: 'invalid-request-parameters',
            status: 400,
            detail: 'Requesten inneholder ugyldige paramtere.',
            instance: 'about:blank',
            invalid_parameters: [
                {
                    name: "ytelsFRONTEND_API_PATHe.tilsynsordning.perioder.['2023-10-10/2023-10-08']",
                    reason: 'Fra og med (FOM) må være før eller lik til og med (TOM).',
                    invalid_value: 'K9-format valideringsfeil',
                    type: 'entity',
                },
            ],
        });
        // res.status(400).send({
        //     type: '/problem-details/invalid-request-parameters',
        //     title: 'invalid-request-parameters',
        //     status: 400,
        //     detail: 'Requesten inneholder ugyldige paramtere.',
        //     instance: 'about:blank',
        //     invalid_parameters: [
        //         {
        //             name: "ytelse.opptjeningAktivitet.selvstendigNæringsdrivende[0].perioder['2021-05-21/..'].regnskapsførerTlf",
        //             reason: "'+00 00000000' matcher ikke tillatt pattern '^[\\p{Graph}\\p{Space}\\p{Sc}\\p{L}\\p{M}\\p{N}]+$'",
        //             invalid_value: 'K9-format valideringsfeil',
        //             type: 'entity',
        //         },
        //     ],
        // });
    });

    server.get('/mellomlagring/PLEIEPENGER_SYKT_BARN', (req, res) => {
        if (existsSync(MELLOMLAGRING_JSON)) {
            const body = readFileSync(MELLOMLAGRING_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });
    server.post('/mellomlagring/PLEIEPENGER_SYKT_BARN', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.put('/mellomlagring/PLEIEPENGER_SYKT_BARN', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.delete('/mellomlagring/PLEIEPENGER_SYKT_BARN', (req, res) => {
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(200);
    });

    server.listen(port, () => {
        console.log(`Express mock-api server listening on port: ${port}`);
        console.log('nic ipv4_host=', getIpAdress());
    });
};

startExpressServer();
