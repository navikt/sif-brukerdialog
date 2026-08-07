import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { EndretSluttdatoOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

export const mockEndretSluttdatoUPY: EndretSluttdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2025-05-31' as ISODate,
        forrigeSluttdato: '2025-05-15' as ISODate,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

export const mockEndretSluttdatoBesvartUPY: EndretSluttdatoOppgave = {
    ...mockEndretSluttdatoUPY,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
