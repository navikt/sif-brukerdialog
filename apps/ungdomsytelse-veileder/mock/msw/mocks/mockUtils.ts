import { deltakelseSchema, registrertDeltakerSchema } from '@navikt/ung-common';
import { DeltakerPersonlia, OppgaveDto, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';
import { Veileder } from '../../../src/types/Veileder';

const nyDeltakerId = '7c6a3e15-4f5b-4cab-badd-198fe0247111';
export const registrertDeltakerId = '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd';

/** Fnr */
export const findDeltaker = (deltakerIdent: string) => {
    switch (deltakerIdent) {
        case nyDeltakerMock.deltakerIdent:
            return nyDeltakerMock;
        case registrertDeltakerMock.deltakerIdent:
            return registrertDeltakerMock;
        default:
            console.log('fant ikke deltaker med deltakerIdent', deltakerIdent);
            return null;
    }
};

/** Registrert id som deltake */
export const getDeltakerByDeltakerId = (deltakerId: string) => {
    if (deltakerId) {
        switch (deltakerId) {
            case registrertDeltakerMock.id:
                return registrertDeltakerMock;
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
    førsteMuligeInnmeldingsdato: '2025-01-01',
    sisteMuligeInnmeldingsdato: '2029-12-31',
};

const nyDeltakerRegistrert = {
    ...nyDeltakerMock,
    id: nyDeltakerId,
};

export const registrertDeltakerMock: DeltakerPersonlia = {
    id: registrertDeltakerId,
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        etternavn: 'HOFTE',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2013-05-10',
    sisteMuligeInnmeldingsdato: '2024-04-10',
};
export const parsedMockDeltaker = registrertDeltakerSchema.parse(registrertDeltakerMock);

export const mockOppgave: OppgaveDto = {
    oppgaveReferanse: '00054e20-e6c3-4b85-8f62-b269e1c15dc2',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-02-19T13:29:14.553804Z',
    oppgavetypeData: {
        programperiode: {
            fomDato: '2025-01-10',
        },
    },
};

const oppgaver: OppgaveDto[] = [];

export const deltakelseDRMock = {
    id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab0-1',
    deltaker: {
        id: registrertDeltakerId,
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-01-01',
    harSøkt: true,
    oppgaver: [...oppgaver],
};
export const parsedMockDeltakelse = deltakelseSchema.parse(deltakelseDRMock);

export const deltakelseDNMock = {
    id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab0-1',
    deltaker: {
        id: nyDeltakerId,
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-01-01',

    harSøkt: false,
    oppgaver: [],
};

export const getDeltakelser = (id) => {
    return id === nyDeltakerId ? [deltakelseDNMock] : [deltakelseDRMock];
};

export const veilederMock: Veileder = {
    preferred_username: 'Pål',
    NAVident: 'Z999999',
};

export const parsedVeilederMock: Veileder = {
    preferred_username: 'Pål',
    NAVident: 'Z999999',
};
