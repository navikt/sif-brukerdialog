/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');

const server = express();
const søknader = require('./mockdata/soknader.json');

server.use(express.json());

server.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }),
);

server.use(function (req, res, next) {
    setTimeout(next, 300);
});

const søker = {
    aktørId: '2534326051524',
    fødselsdato: '1981-02-06',
    fødselsnummer: '06828199151',
    fornavn: 'SUNN',
    mellomnavn: null,
    etternavn: 'KORRIDOR',
};

const startServer = () => {
    const port = 1234;

    server.get('/oppslag/soker', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(søker);
    });

    server.get('/oppslag/soker-ikke-tilgang', (req, res) => {
        res.sendStatus(403);
    });

    server.get('/soknad', (req, res) => {
        res.send(søknader);
    });

    server.get('/soknad-ikke-tilgang', (req, res) => {
        res.sendStatus(403);
    });

    server.get('/soknad/:soknadId/dokument', (req, res) => {
        res.download('./api-mock-server/mockdata/eksempel-søknad.pdf', 'søknad.pdf');
    });

    server.get('/svarfrist', (req, res) => {
        res.send({
            frist: '2021-09-20',
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
        console.log('Returning arbeidsgivermelding');
        res.download('./api-mock-server/mockdata/BekreftelseTilKLONELABBEN.pdf', 'BekreftelseTilKLONELABBEN.pdf');
    });

    server.get('/mellomlagring/PLEIEPENGER_SYKT_BARN', (req, res) => {
        res.send({
            metadata: {
                lastStepID: 'tidsrom',
                version: '6.1',
                updatedTimestemp: '2021-09-20T14:18:01.060Z',
            },
        });
    });

    server.get('/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        res.send({
            // metadata: { lastStepID: 'tidsrom', version: '6.1', updatedTimestamp: '2021-09-20T14:18:01.060Z' },
        });
    });

    server.listen(port, () => {
        console.log(`Mockserver is listening on port: ${port}`);
    });
};

startServer();
