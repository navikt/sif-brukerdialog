import { DeltakelseOpplysningDto, DeltakerPersonalia } from '@navikt/ung-deltakelse-opplyser-api';

const deltakerPersonalia: DeltakerPersonalia = {
    id: '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd',
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        etternavn: 'HOFTE',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2013-05-10',
    sisteMuligeInnmeldingsdato: '2025-04-10',
};

const deltakelse: DeltakelseOpplysningDto = {
    id: deltakerPersonalia.id,
    deltaker: {
        id: deltakerPersonalia.id,
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-01-01',
    harSøkt: true,
    oppgaver: [],
};

export const registrertDeltakerMock = {
    id: deltakerPersonalia.id!,
    deltakerPersonalia,
    deltakelse,
};
