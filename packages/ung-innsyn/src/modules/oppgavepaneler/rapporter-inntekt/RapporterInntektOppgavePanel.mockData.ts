import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype, RapporterInntektOppgave } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

export type RapporterInntektScenario = 'Hel måned' | 'Deler av måned';

export const RAPPORTER_INNTEKT_SCENARIO_OPTIONS: RapporterInntektScenario[] = ['Hel måned', 'Deler av måned'];

const helMånedOppgavetypeData = {
    fraOgMed: '2025-05-01' as ISODate,
    tilOgMed: '2025-05-31' as ISODate,
    gjelderDelerAvMåned: false,
};

const delerAvMånedOppgavetypeData = {
    fraOgMed: '2025-05-10' as ISODate,
    tilOgMed: '2025-05-31' as ISODate,
    gjelderDelerAvMåned: true,
};

const lagRapporterInntektOppgave = (ytelsetype: OppgaveYtelsetype): RapporterInntektOppgave => ({
    oppgaveYtelsetype: ytelsetype,
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    parsedOppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
    oppgavetypeData: helMånedOppgavetypeData,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs('2025-06-01').toDate(),
    frist: dateToISODate(dayjs('2025-06-06').startOf('day')),
    ytelsetype,
});

export const lagRapporterInntektOppgaveMedScenario = (
    base: RapporterInntektOppgave,
    scenario: RapporterInntektScenario,
): RapporterInntektOppgave => ({
    ...base,
    oppgavetypeData: scenario === 'Deler av måned' ? delerAvMånedOppgavetypeData : helMånedOppgavetypeData,
});

export const mockRapporterInntektUPY: RapporterInntektOppgave = lagRapporterInntektOppgave(
    OppgaveYtelsetype.UNGDOMSYTELSE,
);

export const mockRapporterInntektBesvartUPY: RapporterInntektOppgave = {
    ...mockRapporterInntektUPY,
    respons: {
        type: 'RAPPORTERT_INNTEKT',
        fraOgMed: '2025-05-01' as ISODate,
        tilOgMed: '2025-05-31' as ISODate,
        arbeidstakerOgFrilansInntekt: 10000,
    },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().subtract(1, 'days').toDate(),
};

export const mockRapporterInntektAKT: RapporterInntektOppgave = lagRapporterInntektOppgave(
    OppgaveYtelsetype.AKTIVITETSPENGER,
);

export const mockRapporterInntektBesvartAKT: RapporterInntektOppgave = {
    ...mockRapporterInntektBesvartUPY,
    oppgaveYtelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};
