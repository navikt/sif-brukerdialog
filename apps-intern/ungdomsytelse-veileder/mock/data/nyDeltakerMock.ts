import { DeltakerPersonalia } from '@navikt/ung-deltakelse-opplyser-api-veileder';

const nyDeltakerId = '7c6a3e15-4f5b-4cab-badd-198fe0247111';

const deltakerPersonalia: DeltakerPersonalia = {
    deltakerIdent: '56857102105',
    navn: {
        fornavn: 'GLORETE',
        etternavn: 'TØFFEL',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2025-01-01',
    sisteMuligeInnmeldingsdato: '2029-12-31',
    diskresjonskoder: [],
};

export const nyDeltakerMock = {
    nyDeltakerId,
    deltakerPersonalia,
};
