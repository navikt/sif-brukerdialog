/* eslint-disable no-console */
import express from 'express';
import { readFileSync } from 'fs';
import helmet from 'helmet';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();

// Last inn JSON-filer
const saksbehandlingstid = JSON.parse(
    readFileSync(join(__dirname, './mockdata/common/saksbehandlingstid.json'), 'utf-8'),
);

const getMockData = (scenario) => {
    if (scenario === 'ingen-sak') {
        const søker = JSON.parse(readFileSync(join(__dirname, './mockdata/ingen-sak/soker.json'), 'utf-8'));
        const soknader = JSON.parse(readFileSync(join(__dirname, './mockdata/ingen-sak/soknader.json'), 'utf-8'));
        const sakerMetadata = JSON.parse(
            readFileSync(join(__dirname, './mockdata/ingen-sak/saker-metadata.json'), 'utf-8'),
        );
        return { sakerMetadata, søker, saker: [], soknader };
    } else if (scenario === 'debug') {
        const søker = JSON.parse(readFileSync(join(__dirname, './mockdata/debug/soker.json'), 'utf-8'));
        const soknader = JSON.parse(readFileSync(join(__dirname, './mockdata/debug/soknader.json'), 'utf-8'));
        const sakerMetadata = JSON.parse(
            readFileSync(join(__dirname, './mockdata/debug/saker-metadata.json'), 'utf-8'),
        );
        const sak = JSON.parse(readFileSync(join(__dirname, './mockdata/debug/sak.json'), 'utf-8'));
        const inntektsmeldinger = JSON.parse(
            readFileSync(join(__dirname, './mockdata/debug/inntektsmeldinger.json'), 'utf-8'),
        );
        return { sakerMetadata, søker, saker: [{ sak, inntektsmeldinger }], soknader };
    } else if (scenario === 'en-sak') {
        const søker = JSON.parse(readFileSync(join(__dirname, './mockdata/en-sak/soker.json'), 'utf-8'));
        const soknader = JSON.parse(readFileSync(join(__dirname, './mockdata/en-sak/soknader.json'), 'utf-8'));
        const sakerMetadata = JSON.parse(
            readFileSync(join(__dirname, './mockdata/en-sak/saker-metadata.json'), 'utf-8'),
        );
        const sak = JSON.parse(readFileSync(join(__dirname, './mockdata/en-sak/sak.json'), 'utf-8'));
        const inntektsmeldinger = JSON.parse(
            readFileSync(join(__dirname, './mockdata/en-sak/inntektsmeldinger.json'), 'utf-8'),
        );
        return { sakerMetadata, søker, saker: [{ sak, inntektsmeldinger }], soknader };
    } else if (scenario === 'to-saker') {
        const søker = JSON.parse(readFileSync(join(__dirname, './mockdata/to-saker/soker.json'), 'utf-8'));
        const soknader = JSON.parse(readFileSync(join(__dirname, './mockdata/to-saker/soknader.json'), 'utf-8'));
        const sakerMetadata = JSON.parse(
            readFileSync(join(__dirname, './mockdata/to-saker/saker-metadata.json'), 'utf-8'),
        );
        const sak1 = JSON.parse(readFileSync(join(__dirname, './mockdata/to-saker/1001F8G/sak.json'), 'utf-8'));
        const sak2 = JSON.parse(readFileSync(join(__dirname, './mockdata/to-saker/100097Y/sak.json'), 'utf-8'));
        const inntektsmeldinger1 = JSON.parse(
            readFileSync(join(__dirname, './mockdata/to-saker/1001F8G/inntektsmeldinger.json'), 'utf-8'),
        );
        const inntektsmeldinger2 = JSON.parse(
            readFileSync(join(__dirname, './mockdata/to-saker/100097Y/inntektsmeldinger.json'), 'utf-8'),
        );
        return {
            sakerMetadata,
            søker,
            saker: [
                { sak: sak1, inntektsmeldinger: inntektsmeldinger1 },
                { sak: sak2, inntektsmeldinger: inntektsmeldinger2 },
            ],
            soknader,
        };
    }
};

const mockData = getMockData('debug');
// const mockData = getMockData('en-sak');
// const mockData = getMockData('to-saker');

server.use(express.json());

server.use(
    helmet({
        contentSecurityPolicy: true,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }),
);

server.use(function (req, res, next) {
    setTimeout(next, 5);
});

const startServer = () => {
    const port = 1234;

    server.get('/oppslag/soker', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(mockData.søker);
    });

    server.get('/oppslag/soker-ikke-tilgang', (req, res) => {
        res.sendStatus(451);
    });

    server.get('/soknad', (req, res) => {
        res.send(mockData.soknader);
    });

    server.get('/soknad/:soknadId/dokument', (req, res) => {
        res.download('./api-mock-server/mockdata/eksempel-søknad.pdf', 'søknad.pdf');
    });

    server.get('/saker/metadata', (req, res) => {
        res.send(mockData.sakerMetadata);
    });

    server.get('/sak/:saksnr', (req, res) => {
        const saksnr = req.params.saksnr;
        const sak = mockData.saker.find((s) => s.sak.saksnummer === saksnr);

        if (sak) {
            res.send(sak.sak);
        } else {
            res.status(404).send({ error: 'Sak ikke funnet' });
        }
    });

    server.get('/sak/:saksnr/inntektsmeldinger', (req, res) => {
        const saksnr = req.params.saksnr;
        const sak = mockData.saker.find((s) => s.sak.saksnummer === saksnr);

        if (sak) {
            res.send(sak.inntektsmeldinger);
        } else {
            res.status(404).send({ error: 'Inntektsmeldinger ikke funnet' });
        }
    });

    server.get('/saker/saksbehandlingstid', (req, res) => {
        res.send(saksbehandlingstid);
    });

    server.get('/dokument/:journalpostId/:dokumentInfoId/:variantFormat', (req, res) => {
        switch (req.params.dokumentInfoId) {
            case '533438765':
                res.download(
                    './api-mock-server/mockdata/Ettersending av vedlegg - Pleiepenger sykt barn.pdf',
                    'Ettersending av vedlegg - Pleiepenger sykt barn.pdf',
                );
                break;
            case '533438766':
                res.download(
                    './api-mock-server/mockdata/BekreftelseTilKLONELABBEN.pdf',
                    'BekreftelseTilKLONELABBEN.pdf',
                );
                break;
            default:
                res.download('./api-mock-server/mockdata/Søknad om pleiepenger.pdf', 'Søknad om pleiepenger.pdf');
                break;
        }
    });

    server.get('/soknad/:soknadId/arbeidsgivermelding', (req, res) => {
        res.download('./api-mock-server/mockdata/BekreftelseTilKLONELABBEN.pdf', 'BekreftelseTilKLONELABBEN.pdf');
    });

    server.listen(port, () => {
        console.log(`Mockserver is listening on port: ${port}`);
    });
};

startServer();
