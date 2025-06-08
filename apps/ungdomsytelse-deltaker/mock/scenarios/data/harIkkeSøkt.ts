import { ScenarioData } from '../types';

export const harIkkeSøktMock: ScenarioData = {
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
    deltakelser: [
        {
            id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
            fraOgMed: '2025-07-02',
            tilOgMed: undefined,
            oppgaver: [
                {
                    oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
                    oppgavetype: 'SØK_YTELSE',
                    status: 'ULØST',
                    oppgavetypeData: {
                        fomDato: '2025-08-01',
                    },
                    opprettetDato: '2025-05-31T03:58:01.779214Z',
                },
            ],
        },
    ],
};
