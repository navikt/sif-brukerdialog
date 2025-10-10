import { ScenarioData } from '../types';

export const deltakerBaseScenarioData: ScenarioData = {
    søker: {
        aktørId: '2320509955297',
        fødselsdato: '2005-06-02',
        fødselsnummer: '02869599258',
        fornavn: 'Test',
        mellomnavn: undefined,
        etternavn: 'Brukeresen',
    },
    barn: {
        barn: [
            {
                fornavn: 'ALFABETISK',
                etternavn: 'TURLØYPE',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
        ],
    },
    arbeidsgiver: [
        {
            navn: 'HAUGEN AS',
            organisasjonsnummer: '123451234',
            ansattFom: '2019-09-25',
            ansattTom: undefined,
        },
    ],
    deltakelser: [],
};
