/** Fnr */
export const getDeltakerByDeltakerIdent = (deltakerIdent) => {
    switch (deltakerIdent) {
        case nyDeltaker.deltakerIdent:
            return nyDeltaker;
        case registrertDeltaker.deltakerIdent:
            return registrertDeltaker;
        default:
            console.log('fant ikke deltaker med deltakerIdent', deltakerIdent);
            return null;
    }
};

/** Registrert id som deltake */
export const getDeltakerByDeltakerId = (deltakerId) => {
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

const oppgave = {
    id: '00054e20-e6c3-4b85-8f62-b269e1c15dc2',
    oppgavetype: 'BEKREFT_ENDRET_STARTDATO',
    status: 'ULØST',
    opprettetDato: '2025-02-19T13:29:14.553804Z',
    løstDato: null,
    oppgavetypeData: {
        nyStartdato: '2025-01-10',
    },
};

const deltakelseDR = {
    id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab0-1',
    deltaker: {
        id: 'd-r',
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-01-01',
    tilOgMed: '2025-05-01',
    harSøkt: true,
    oppgaver: [oppgave],
};

const deltakelseDN = {
    id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab0-1',
    deltaker: {
        id: 'd-n',
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-01-01',
    tilOgMed: null,
    harSøkt: false,
    oppgaver: [],
};

export const getDeltakelser = (id) => {
    return id === 'd-n' ? [deltakelseDN] : [deltakelseDR];
};
