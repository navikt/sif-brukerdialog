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
const søknader = JSON.parse(readFileSync(join(__dirname, './mockdata/soknader.json'), 'utf-8'));
const inntektsmeldinger = JSON.parse(readFileSync(join(__dirname, './mockdata/inntektsmeldinger.json'), 'utf-8'));
const flereSaker = JSON.parse(readFileSync(join(__dirname, './mockdata/flere-saker.json'), 'utf-8'));
const saker = JSON.parse(readFileSync(join(__dirname, './mockdata/saker.json'), 'utf-8'));

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

const søker = {
    aktørId: '2534326051524',
    fødselsdato: '1981-02-06',
    fødselsnummer: '06828199151',
    fornavn: 'SUNN',
    mellomnavn: null,
    etternavn: 'KORRIDOR',
};

const sakerMetadata = saker.map((sak) => ({
    saksnummer: sak.sak.saksnummer,
    pleietrengende: {
        identitetsnummer: sak.pleietrengende.identitetsnummer,
        fødselsdato: sak.pleietrengende.fødselsdato,
        aktørId: sak.pleietrengende.aktørId,
        fornavn: sak.pleietrengende.fornavn,
        etternavn: sak.pleietrengende.etternavn,
    },
    fagsakYtelseType: 'PSB',
}));

const startServer = () => {
    const port = 1234;

    server.get('/oppslag/soker', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(søker);
    });

    server.get('/oppslag/soker-ikke-tilgang', (req, res) => {
        res.sendStatus(451);
    });

    server.get('/soknad', (req, res) => {
        res.send(søknader);
    });

    server.get('/soknad/:soknadId/dokument', (req, res) => {
        res.download('./api-mock-server/mockdata/eksempel-søknad.pdf', 'søknad.pdf');
    });

    server.get('/saker', (req, res) => {
        res.send(saker);
    });

    server.get('/saker/metadata', (req, res) => {
        res.send(sakerMetadata);
    });

    server.get('/sak/:saksnr', (req, res) => {
        const saksnr = req.params.saksnr;
        const sak = flereSaker.find((s) => s.sak.saksnummer === saksnr);

        if (sak) {
            res.send(sak.sak);
        } else {
            res.status(404).send({ error: 'Sak ikke funnet' });
        }
    });

    server.get('/sak/:saksnr/inntektsmeldinger', (req, res) => {
        res.send(inntektsmeldinger);
    });

    server.get('/saksbehandlingstid', (req, res) => {
        res.send({
            saksbehandlingstidUker: 7,
        });
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
