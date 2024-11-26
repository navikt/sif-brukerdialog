/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(
    helmet({
        contentSecurityPolicy: true,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }),
);

server.use(
    cors({
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
        allowedHeaders: ['content-type', 'X-Brukerdialog-Git-Sha', 'x_correlation_id'],
        credentials: true,
    }),
);
server.options('*', cors());

const nyDeltaker = {
    deltaker: {
        deltakerId: 'd-n',
        fødselsdato: '1995-06-02',
        fødselsnummer: '56857102105',
        fornavn: 'GLORETE',
        mellomnavn: null,
        etternavn: 'TØFFEL',
    },
    deltakelser: [],
};

const registrertDeltaker = {
    deltaker: {
        deltakerId: 'd-r',
        fødselsdato: '1995-06-02',
        fødselsnummer: '03867198392',
        fornavn: 'PRESENTABEL',
        mellomnavn: null,
        etternavn: 'HOFTE',
    },
    deltakelser: [
        {
            id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab0',
            deltakerId: '56857102105',
            fraOgMed: '2025-09-01',
        },
    ],
};

const getDeltakerOgDeltakelser = (body) => {
    const { fnr, deltakerId } = body;
    if (fnr) {
        console.log('Henter deltaker med fnr', fnr);
        switch (fnr) {
            case nyDeltaker.deltaker.fødselsnummer:
                return nyDeltaker;
            case registrertDeltaker.deltaker.fødselsnummer:
                return registrertDeltaker;
            default:
                console.log('fant ikke deltaker med fnr', fnr);
                return null;
        }
    }
    if (deltakerId) {
        console.log('Henter deltaker med deltakerId', deltakerId);
        switch (deltakerId) {
            case nyDeltaker.deltaker.deltakerId:
                return nyDeltaker;
            case registrertDeltaker.deltaker.deltakerId:
                return registrertDeltaker;
            default:
                console.log('Fant ikke deltaker med deltakerId', deltakerId);
                return null;
        }
    }
};

const startExpressServer = () => {
    const port = process.env.PORT || 8099;

    server.post('/oppslag/deltaker', (req, res) => {
        const response = getDeltakerOgDeltakelser(req.body);
        console.log(response);
        setTimeout(() => {
            res.status(200).send(response);
        }, 1000);
    });

    server.post('/veileder/register/hent/alle', (req, res) => {
        const id = req.body.deltakerId;
        const response = id === registrertDeltaker.fødselsnummer ? delt : [];
        setTimeout(() => {
            res.status(200).send(response);
        }, 50);
    });

    server.post('/veileder/register/legg-til', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        const response = {
            ...req.body,
        };
        setTimeout(() => {
            res.status(200).send(response);
        }, 50);
    });

    server.post('/veileder/register/legg-til-error', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        const response = {
            ...req.body,
        };
        setTimeout(() => {
            res.status(409).send({
                type: '/problem-details/deltaker-med-overlappende-periode',
                title: 'Deltaker er allerede i programmet for oppgitt periode',
                status: 409,
                detail: 'Key (deltaker_ident, periode)=(02499435811, [2024-10-08,)) conflicts with existing key (deltaker_ident, periode)=(02499435811, [2024-10-01,)).',
                instance: 'https://ungdomsytelse-veileder.intern.dev.nav.no/veileder/register/legg-til',
            });
        }, 50);
    });

    server.put('/veileder/register/oppdater/:id', (req, res) => {
        const body = req.body;
        console.log('[put] body', body);
        const response = {
            ...req.body,
        };
        setTimeout(() => {
            res.status(200).send(response);
        }, 50);
    });

    server.delete('/veileder/register/fjern/:id', (req, res) => {
        res.sendStatus(200);
    });

    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startExpressServer();
