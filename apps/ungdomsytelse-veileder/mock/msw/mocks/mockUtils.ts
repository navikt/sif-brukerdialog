import { Søker } from '@navikt/sif-common-api';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { DeltakerPersonlia, OppgaveDto, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

const nyDeltakerId = '7c6a3e15-4f5b-4cab-badd-198fe0247111';
export const registrertDeltakerId = '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd';

/** Fnr */
export const findDeltaker = (deltakerIdent: string) => {
    switch (deltakerIdent) {
        case nyDeltakerMock.deltakerIdent:
            return nyDeltakerMock;
        case registrertDeltaker.deltakerIdent:
            return registrertDeltaker;
        default:
            console.log('fant ikke deltaker med deltakerIdent', deltakerIdent);
            return null;
    }
};

/** Registrert id som deltake */
export const getDeltakerByDeltakerId = (deltakerId: string) => {
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

export const nyDeltakerMock: DeltakerPersonlia = {
    id: null as any,
    deltakerIdent: '56857102105',
    navn: {
        fornavn: 'GLORETE',
        mellomnavn: null as any,
        etternavn: 'TØFFEL',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2024-01-01',
    sisteMuligeInnmeldingsdato: '2024-12-31',
};

const nyDeltakerRegistrert = {
    ...nyDeltakerMock,
    id: nyDeltakerId,
};

const registrertDeltaker: DeltakerPersonlia = {
    id: registrertDeltakerId,
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        mellomnavn: null as any,
        etternavn: 'HOFTE',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2024-01-01',
    sisteMuligeInnmeldingsdato: '2024-12-31',
};

const oppgave: OppgaveDto = {
    id: '00054e20-e6c3-4b85-8f62-b269e1c15dc2',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    status: OppgaveStatus.ULØST,
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

export const deltakelseDNMock = {
    id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab0-1',
    deltaker: {
        id: nyDeltakerId,
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-01-01',
    tilOgMed: null as any,
    harSøkt: false,
    oppgaver: [],
};

export const getDeltakelser = (id) => {
    return id === nyDeltakerId ? [deltakelseDNMock] : [deltakelseDR];
};

export const veilederMock: Søker = {
    fornavn: 'Pål',
    etternavn: 'Hønesen',
    aktørId: '123456789',
    fødselsdato: ISODateToDate('1990-01-01'),
    fødselsnummer: 'w34',
};
