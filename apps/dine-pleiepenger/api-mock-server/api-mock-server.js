/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const server = express();
const søknader = require('./mockdata/soknader.json');
const saker = require('./mockdata/saker.json');
// const saker = require('./mockdata/saker-med-to-vedtak.json');
// const saker = require('./mockdata/saker-uten-søknad-men-behandling.json');
// const saker = require('./mockdata/sak-uten-behandling.json');
// const saker = require('./mockdata/sak-med-ettersendelse.json');
// const saker = require('./mockdata/saker-sn.json');
// const saker = require('./mockdata/saker-med-venteårsak.json');
// const saker = require('./mockdata/saker-debug.json');
// const saker = require('./mockdata/flere-saker.json');
// const saker = require('./mockdata/saker-anonymisert-pleietrengende.json');

server.use(express.json());

server.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }),
);

server.use(function (req, res, next) {
    setTimeout(next, 50);
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

    server.get('/saker/saksbehandlingstid', (req, res) => {
        res.send({
            saksbehandlingstidUker: 5,
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

    server.get('/mellomlagring/PLEIEPENGER_SYKT_BARN', (req, res) => {
        res.send({
            metadata: {
                lastStepID: 'tidsrom',
                version: '6.1',
                updatedTimestemp: '2022-12-20T14:18:01.060Z',
            },
        });
    });

    server.get('/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        res.send({
            metadata: { lastStepID: 'tidsrom', version: '6.1', updatedTimestamp: '2023-07-01T20:54:12.060Z' },
        });
    });

    server.listen(port, () => {
        console.log(`Mockserver is listening on port: ${port}`);
    });
};

startServer();
