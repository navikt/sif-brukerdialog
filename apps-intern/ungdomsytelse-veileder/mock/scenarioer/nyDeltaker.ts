import { DeltakerPersonalia } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { MockScenario } from './types';

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

export const nyDeltakerScenario: MockScenario = {
    fnr: '56857102105',
    beskrivelse: 'Ny deltaker (ikke registrert)',
    gruppe: 'grunnscenarioer',
    deltakerPersonalia,
};
