import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype, SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const mockSøkYtelseUPY: SøkYtelseOppgave = {
    oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
    oppgavetype: OppgaveType.SØK_YTELSE,
    parsedOppgavetype: ParsedOppgavetype.SØK_YTELSE,
    oppgavetypeData: {
        fomDato: '2025-05-01' as ISODate,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs.utc('2025-05-31T03:58:01.779214Z').toDate(),
    frist: dateToISODate(dayjs.utc('2025-06-14T03:58:01.779214Z')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

export const mockSøkYtelseBesvartUPY: SøkYtelseOppgave = {
    ...mockSøkYtelseUPY,
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
