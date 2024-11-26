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
    id: null,
    deltakerIdent: '56857102105',
    navn: {
        fornavn: 'GLORETE',
        mellomnavn: null,
        etternavn: 'TØFFEL',
    },
};

const nyDeltakerRegistrert = {
    ...nyDeltaker,
    id: 'd-n',
};

const registrertDeltaker = {
    id: 'd-r',
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        mellomnavn: null,
        etternavn: 'HOFTE',
    },
};

const deltakelser = [
    {
        deltakerId: 'd-r',
        id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab0',
        fraOgMed: '2025-09-01',
    },
];

const getDeltaker = ({ fnr, deltakerId }) => {
    if (fnr) {
        console.log('henter deltaker med fnr', fnr);
        switch (fnr) {
            case nyDeltaker.deltakerIdent:
                return nyDeltaker;
            case registrertDeltaker.deltakerIdent:
                return registrertDeltaker;
            default:
                console.log('fant ikke deltaker med fnr', fnr);
                return null;
        }
    }
    if (deltakerId) {
        console.log('henter deltaker med id', deltakerId);
        switch (deltakerId) {
            case registrertDeltaker.id:
                return registrertDeltaker;
            case nyDeltakerRegistrert.id:
                return nyDeltakerRegistrert;
            default:
                console.log('fant ikke deltaker med id', deltakerId);
                return null;
        }
    }
};

const getDeltakelser = (id) => {
    return deltakelser;
};

const startExpressServer = () => {
    const port = process.env.PORT || 8099;

    server.post('/oppslag/deltaker', (req, res) => {
        const response = getDeltaker(req.body);
        setTimeout(() => {
            res.status(200).send(response);
        }, 350);
    });

    server.post('/veileder/register/hent/alle', (req, res) => {
        console.log('/oppslag/deltakelser', req.body);
        const response = getDeltakelser(req.body.id);
        console.log(response);
        setTimeout(() => {
            res.status(200).send(response);
        }, 250);
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

    server.post('/veileder/register/registrer-ny', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        const response = {
            ...registrertDeltaker,
            id: 'd-n',
        };
        setTimeout(() => {
            res.status(200).send(response);
        }, 1500);
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
