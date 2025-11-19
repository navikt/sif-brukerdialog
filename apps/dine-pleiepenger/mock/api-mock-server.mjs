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
const saksbehandlingstid = JSON.parse(readFileSync(join(__dirname, './data/saksbehandlingstid.json'), 'utf-8'));

const getMockData = (scenario) => {
    if (scenario === 'ingen-sak') {
        const søker = JSON.parse(readFileSync(join(__dirname, './data/ingen-sak/soker.json'), 'utf-8'));
        const soknader = JSON.parse(readFileSync(join(__dirname, './data/ingen-sak/soknader.json'), 'utf-8'));
        const sakerMetadata = JSON.parse(
            readFileSync(join(__dirname, './data/ingen-sak/saker-metadata.json'), 'utf-8'),
        );
        return { sakerMetadata, søker, saker: [], soknader };
    } else if (scenario === 'sak-error') {
        const søker = JSON.parse(readFileSync(join(__dirname, './data/ingen-sak/soker.json'), 'utf-8'));
        const sakerMetadata = JSON.parse(readFileSync(join(__dirname, './data/to-saker/saker-metadata.json'), 'utf-8'));
        return { sakerMetadata, søker, saker: [], soknader: [] };
    } else if (scenario === 'debug') {
        const søker = JSON.parse(readFileSync(join(__dirname, './data/debug/soker.json'), 'utf-8'));
        const soknader = JSON.parse(readFileSync(join(__dirname, './data/debug/soknader.json'), 'utf-8'));
        const sakerMetadata = JSON.parse(readFileSync(join(__dirname, './data/debug/saker-metadata.json'), 'utf-8'));
        const sak = JSON.parse(readFileSync(join(__dirname, './data/debug/sak.json'), 'utf-8'));
        const inntektsmeldinger = JSON.parse(
            readFileSync(join(__dirname, './data/debug/inntektsmeldinger.json'), 'utf-8'),
        );
        return { sakerMetadata, søker, saker: [{ sak, inntektsmeldinger }], soknader };
    } else if (scenario === 'en-sak') {
        const søker = JSON.parse(readFileSync(join(__dirname, './data/en-sak/soker.json'), 'utf-8'));
        const soknader = JSON.parse(readFileSync(join(__dirname, './data/en-sak/soknader.json'), 'utf-8'));
        const sakerMetadata = JSON.parse(readFileSync(join(__dirname, './data/en-sak/saker-metadata.json'), 'utf-8'));
        const sak = JSON.parse(readFileSync(join(__dirname, './data/en-sak/sak.json'), 'utf-8'));
        const inntektsmeldinger = JSON.parse(
            readFileSync(join(__dirname, './data/en-sak/inntektsmeldinger.json'), 'utf-8'),
        );
        return { sakerMetadata, søker, saker: [{ sak, inntektsmeldinger }], soknader };
    } else if (scenario === 'to-saker') {
        const søker = JSON.parse(readFileSync(join(__dirname, './data/to-saker/soker.json'), 'utf-8'));
        const soknader = JSON.parse(readFileSync(join(__dirname, './data/to-saker/soknader.json'), 'utf-8'));
        const sakerMetadata = JSON.parse(readFileSync(join(__dirname, './data/to-saker/saker-metadata.json'), 'utf-8'));
        const sak1 = JSON.parse(readFileSync(join(__dirname, './data/to-saker/1001F8G/sak.json'), 'utf-8'));
        const sak2 = JSON.parse(readFileSync(join(__dirname, './data/to-saker/100097Y/sak.json'), 'utf-8'));
        const inntektsmeldinger1 = JSON.parse(
            readFileSync(join(__dirname, './data/to-saker/1001F8G/inntektsmeldinger.json'), 'utf-8'),
        );
        const inntektsmeldinger2 = JSON.parse(
            readFileSync(join(__dirname, './data/to-saker/100097Y/inntektsmeldinger.json'), 'utf-8'),
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

// const mockData = getMockData('debug');
// const mockData = getMockData('sak-error');
// const mockData = getMockData('ingen-sak');
// const mockData = getMockData('en-sak');
const mockData = getMockData('to-saker');

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
        res.download('./data/eksempel-søknad.pdf', 'søknad.pdf');
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
            case '454412718':
                res.download('./mock/dokumenter/ettersendelse.pdf', 'ettersendelse.pdf');
                break;
            case '454412719':
                res.download('./mock/dokumenter/vedlegg.pdf', 'vedlegg.pdf');
                break;
            case '454427849':
                res.download('./mock/dokumenter/arbeidsgivermelding.pdf', 'BekreftelseTilKLONELABBEN.pdf');
                break;
            default:
                res.download('./mock/dokumenter/søknad.pdf', 'Søknad om pleiepenger.pdf');
                break;
        }
    });

    /** Mock arbeidsgivermelding */
    server.get('/soknad/:soknadId/arbeidsgivermelding', (req, res) => {
        res.download('./mock/dokumenter/arbeidsgivermelding.pdf', 'arbeidsgivermelding.pdf');
    });

    server.listen(port, () => {
        console.log(`Mockserver is listening on port: ${port}`);
    });
};

startServer();
