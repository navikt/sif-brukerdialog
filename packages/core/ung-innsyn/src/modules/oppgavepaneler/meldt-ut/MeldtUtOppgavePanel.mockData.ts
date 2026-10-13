import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { MeldtUtOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

export const mockMeldtUtUPY: MeldtUtOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT,
    oppgavetypeData: {
        sluttdato: '2025-05-01' as ISODate,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

export const mockMeldtUtBesvartUPY: MeldtUtOppgave = {
    ...mockMeldtUtUPY,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
