import {
    ArbeidOgFrilansRegisterInntektDto,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
    RegisterinntektDto,
    YtelseRegisterInntektDto,
    YtelseType,
} from '@navikt/ung-brukerdialog-api';
import { AvvikRegisterinntektOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

// ─── Inntektsdata ────────────────────────────────────────────────────────────

export const inntektArbeidsgiver1: ArbeidOgFrilansRegisterInntektDto = {
    inntekt: 1500,
    arbeidsgiverIdentifikator: '947064649',
    arbeidsgiverNavn: 'SJOKKERENDE ELEKTRIKER',
};

export const inntektArbeidsgiver2: ArbeidOgFrilansRegisterInntektDto = {
    inntekt: 500,
    arbeidsgiverIdentifikator: '247064649',
    arbeidsgiverNavn: 'SMIDIG MALER',
};

export const inntektYtelse1: YtelseRegisterInntektDto = { inntekt: 3400, ytelsetype: YtelseType.SYKEPENGER };

const registerInntektEnArbeidsgiver: RegisterinntektDto = {
    arbeidOgFrilansInntekter: [inntektArbeidsgiver1],
    ytelseInntekter: [],
    totalInntektArbeidOgFrilans: inntektArbeidsgiver1.inntekt,
    totalInntektYtelse: 0,
    totalInntekt: inntektArbeidsgiver1.inntekt,
};

// ─── Hjelpefunksjon ───────────────────────────────────────────────────────────

export const lagOppgaveMedInntekt = (
    base: AvvikRegisterinntektOppgave,
    arbeidOgFrilansInntekter: ArbeidOgFrilansRegisterInntektDto[] = [],
    ytelseInntekter: YtelseRegisterInntektDto[] = [],
): AvvikRegisterinntektOppgave => {
    const totalInntektArbeidOgFrilans = arbeidOgFrilansInntekter.reduce((sum, i) => sum + i.inntekt, 0);
    const totalInntektYtelse = ytelseInntekter.reduce((sum, i) => sum + i.inntekt, 0);
    return {
        ...base,
        oppgavetypeData: {
            ...base.oppgavetypeData,
            registerinntekt: {
                arbeidOgFrilansInntekter,
                ytelseInntekter,
                totalInntektArbeidOgFrilans,
                totalInntektYtelse,
                totalInntekt: totalInntektArbeidOgFrilans + totalInntektYtelse,
            },
        },
    };
};

// ─── Scenariovarianter ───────────────────────────────────────────────────────

export type AvvikScenario = 'Én arbeidsgiver' | 'To arbeidsgivere' | 'Kun Nav-ytelse' | 'Arbeidsgiver og Nav-ytelse' | 'Ingen inntekt';

export const AVVIK_SCENARIO_OPTIONS: AvvikScenario[] = [
    'Én arbeidsgiver',
    'To arbeidsgivere',
    'Kun Nav-ytelse',
    'Arbeidsgiver og Nav-ytelse',
    'Ingen inntekt',
];

export const lagOppgaveMedScenario = (
    base: AvvikRegisterinntektOppgave,
    scenario: AvvikScenario,
): AvvikRegisterinntektOppgave => {
    switch (scenario) {
        case 'Én arbeidsgiver':           return lagOppgaveMedInntekt(base, [inntektArbeidsgiver1]);
        case 'To arbeidsgivere':          return lagOppgaveMedInntekt(base, [inntektArbeidsgiver1, inntektArbeidsgiver2]);
        case 'Kun Nav-ytelse':            return lagOppgaveMedInntekt(base, undefined, [inntektYtelse1]);
        case 'Arbeidsgiver og Nav-ytelse':return lagOppgaveMedInntekt(base, [inntektArbeidsgiver1], [inntektYtelse1]);
        case 'Ingen inntekt':             return lagOppgaveMedInntekt(base, [], []);
    }
};

export const mockAvvikRegisterinntektUPY: AvvikRegisterinntektOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: '2025-05-01' as ISODate,
        tilOgMed: '2025-05-31' as ISODate,
        registerinntekt: registerInntektEnArbeidsgiver,
        gjelderDelerAvMåned: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

export const mockAvvikRegisterinntektBesvartUPY: AvvikRegisterinntektOppgave = {
    ...mockAvvikRegisterinntektUPY,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

// ─── AKT-mocks ───────────────────────────────────────────────────────────────

export const mockAvvikRegisterinntektAKT: AvvikRegisterinntektOppgave = {
    ...mockAvvikRegisterinntektUPY,
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};

export const mockAvvikRegisterinntektBesvartAKT: AvvikRegisterinntektOppgave = {
    ...mockAvvikRegisterinntektBesvartUPY,
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};
