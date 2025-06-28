import { DeltakerPersonalia, Diskresjonskode } from '@navikt/ung-deltakelse-opplyser-api-veileder';

const nyDeltakerId = '7c6a3e15-4f5b-4cab-badd-198fe0247111';

const deltakerPersonalia: DeltakerPersonalia = {
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
    diskresjonskoder: [Diskresjonskode.KODE7],
};

export const nyDeltakerMock = {
    nyDeltakerId,
    deltakerPersonalia,
};
