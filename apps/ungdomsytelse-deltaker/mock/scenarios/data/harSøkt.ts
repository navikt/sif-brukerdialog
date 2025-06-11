import { ScenarioData } from '../types';

export const harSøktMock: ScenarioData = {
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
            søktTidspunkt: '2025-04-17T05:05:01.714798Z',
            oppgaver: [
                {
                    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
                    oppgavetype: 'BEKREFT_ENDRET_STARTDATO',
                    oppgavetypeData: {
                        nyStartdato: '2025-05-01',
                        forrigeStartdato: '2025-05-02',
                    },
                    bekreftelse: {
                        harGodtattEndringen: true,
                    },
                    status: 'ULØST',
                    opprettetDato: '2025-06-04T10:32:47.664066Z',
                    frist: '2025-06-04T12:47:47.492347Z',
                },
                {
                    oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
                    oppgavetype: 'SØK_YTELSE',
                    oppgavetypeData: {
                        fomDato: '2025-05-01',
                    },
                    status: 'LØST',
                    opprettetDato: '2025-05-31T03:58:01.779214Z',
                    løstDato: '2025-05-31T03:58:42.211729Z',
                },
            ],
        },
    ],
};
