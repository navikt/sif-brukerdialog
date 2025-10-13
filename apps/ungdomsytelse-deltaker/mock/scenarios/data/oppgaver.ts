import { OppgaveDto, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

const søkYtelseOppgave: OppgaveDto = {
    oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
    oppgavetype: Oppgavetype.SØK_YTELSE,
    status: OppgaveStatus.ULØST,
    frist: '2025-08-31T12:47:47.492347Z',
    oppgavetypeData: {
        fomDato: '2025-08-01',
    },
    opprettetDato: '2025-07-28T03:58:01.779214Z',
};

const søkYtelseOppgaveLøst: OppgaveDto = {
    oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
    oppgavetype: Oppgavetype.SØK_YTELSE,
    oppgavetypeData: {
        fomDato: '2025-08-01',
    },
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-07-28T03:58:01.779214Z',
    løstDato: '2025-08-03T03:58:42.211729Z',
};

const rapporterInntektOppgave: OppgaveDto = {
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-10-01T10:32:47.664066Z',
    frist: '2025-10-06T12:47:47.492347Z',
    oppgavetypeData: {
        fraOgMed: '2025-09-01',
        tilOgMed: '2025-09-30',
    },
};

const rapporterInntektOppgaveLøst: OppgaveDto = {
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-10-01T10:32:47.664066Z',
    frist: '2025-10-06T12:47:47.492347Z',
    løstDato: '2025-10-04T12:47:47.492347Z',
    oppgavetypeData: {
        fraOgMed: '2025-09-01',
        tilOgMed: '2025-09-30',
        rapportertInntekt: {
            fraOgMed: '2025-09-01',
            tilOgMed: '2025-09-30',
            arbeidstakerOgFrilansInntekt: 23000,
        },
    },
};

const endretStartdatoOppgave: OppgaveDto = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: '2025-08-01',
        forrigeStartdato: '2025-08-02',
    },
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-08-12T10:32:47.664066Z',
    frist: '2025-08-15T12:47:47.492347Z',
};

const endretStartdatoOppgaveLøst: OppgaveDto = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: '2025-08-01',
        forrigeStartdato: '2025-08-02',
    },
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-08-12T10:32:47.664066Z',
    frist: '2025-08-15T12:47:47.492347Z',
    løstDato: '2025-08-13T12:47:47.492347Z',
};

const meldtUtOppgave: OppgaveDto = {
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    frist: '2025-09-23T07:39:32.310154Z',
};

const meldtUtOppgaveLøst: OppgaveDto = {
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
        forrigeSluttdato: '2026-01-30',
    },
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    løstDato: '2025-09-22T05:40:05.767753Z',
    frist: '2025-09-23T07:39:32.310154Z',
};

const endretSluttdatoOppgave: OppgaveDto = {
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
        forrigeSluttdato: '2026-01-30',
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    åpnetDato: '2025-09-22T05:39:34.793877Z',
    frist: '2025-09-23T07:39:32.310154Z',
};

const endretSluttdatoOppgaveLøst: OppgaveDto = {
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
        forrigeSluttdato: '2026-01-30',
    },
    bekreftelse: {
        harUttalelse: true,
        uttalelseFraBruker: 'teste',
    },
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    løstDato: '2025-09-22T05:40:05.767753Z',
    åpnetDato: '2025-09-22T05:39:34.793877Z',
    frist: '2025-09-23T07:39:32.310154Z',
};

const bekreftAvvikOppgave: OppgaveDto = {
    oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: '2025-09-01',
        tilOgMed: '2025-09-30',
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
    frist: '2025-10-30T12:47:47.492347Z',
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-10-10T05:00:46.869460Z',
};

const bekreftAvvikOppgaveLøst: OppgaveDto = {
    oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: '2025-09-01',
        tilOgMed: '2025-09-30',
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
    bekreftelse: {
        harUttalelse: false,
    },
    løstDato: '2025-09-22T05:40:05.767753Z',
    frist: '2025-10-30T12:47:47.492347Z',
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-10-15T05:00:46.869460Z',
};

export const mockOppgaver = {
    rapporterInntektOppgave,
    rapporterInntektOppgaveLøst,
    endretStartdatoOppgave,
    endretStartdatoOppgaveLøst,
    endretSluttdatoOppgave,
    endretSluttdatoOppgaveLøst,
    bekreftAvvikOppgave,
    bekreftAvvikOppgaveLøst,
    søkYtelseOppgave,
    søkYtelseOppgaveLøst,
    meldtUtOppgaveLøst,
    meldtUtOppgave,
};
