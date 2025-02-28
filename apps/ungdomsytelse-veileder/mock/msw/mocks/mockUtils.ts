import { HentDeltakerInfoGittDeltakerIdResult, OppgaveDTO } from '@navikt/ung-deltakelse-opplyser';

const nyDeltakerId = '7c6a3e15-4f5b-4cab-badd-198fe0247111';
const registrertDeltakerId = '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd';

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
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2024-01-01',
    sisteMuligeInnmeldingsdato: '2024-12-31',
};

const nyDeltakerRegistrert = {
    ...nyDeltaker,
    id: nyDeltakerId,
};

const registrertDeltaker: HentDeltakerInfoGittDeltakerIdResult = {
    id: registrertDeltakerId,
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        etternavn: 'HOFTE',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2024-01-01',
    sisteMuligeInnmeldingsdato: '2024-12-31',
};

const oppgave: OppgaveDTO = {
    id: '00054e20-e6c3-4b85-8f62-b269e1c15dc2',
    oppgavetype: 'BEKREFT_ENDRET_STARTDATO',
    status: 'ULØST',
    opprettetDato: '2025-02-19T13:29:14.553804Z',
    oppgavetypeData: {
        nyStartdato: '2025-01-10',
        veilederRef: 'Veil Veiledersen',
        meldingFraVeileder: 'Hei, dette',
    },
};

const deltakelseDR = {
    id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab0-1',
    deltaker: {
        id: registrertDeltakerId,
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
        id: nyDeltakerId,
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-01-01',
    tilOgMed: null,
    harSøkt: false,
    oppgaver: [],
};

export const getDeltakelser = (id) => {
    console.log({ deltakelseDN, deltakelseDR });
    return id === nyDeltakerId ? [deltakelseDN] : [deltakelseDR];
};
