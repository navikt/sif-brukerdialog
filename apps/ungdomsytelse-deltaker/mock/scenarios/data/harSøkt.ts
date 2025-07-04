import { DeltakelseKomposittDto, zDeltakelseKomposittDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { ScenarioData } from '../types';

const deltakelse: DeltakelseKomposittDto = zDeltakelseKomposittDto.parse({
    id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
    fraOgMed: '2025-07-02',
    tilOgMed: undefined,
    søktTidspunkt: '2025-04-17T05:05:01.714798Z',
    deltaker: {
        id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
        deltakerIdent: '234',
    },
    oppgaver: [
        {
            oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
            oppgavetype: 'BEKREFT_ENDRET_STARTDATO',
            oppgavetypeData: {
                nyStartdato: '2025-05-01',
                forrigeStartdato: '2025-05-02',
            },
            bekreftelse: {
                harUttalelse: false,
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
        {
            oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
            oppgavetype: 'BEKREFT_AVVIK_REGISTERINNTEKT',
            oppgavetypeData: {
                type: 'BEKREFT_AVVIK_REGISTERINNTEKT',
                fraOgMed: '2025-03-01',
                tilOgMed: '2025-03-31',
                registerinntekt: {
                    arbeidOgFrilansInntekter: [
                        {
                            inntekt: 20000,
                            arbeidsgiver: '947064649',
                            arbeidsgiverNavn: 'SJOKKERENDE ELEKTRIKER',
                        },
                    ],
                    ytelseInntekter: [],
                    totalInntektArbeidOgFrilans: 20000,
                    totalInntektYtelse: 0,
                    totalInntekt: 20000,
                },
            },
            status: 'ULØST',
            opprettetDato: '2025-04-07T05:00:46.869460Z',
        },
    ],
}) as DeltakelseKomposittDto;

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
    deltakelser: [deltakelse],
};
