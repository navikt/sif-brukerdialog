import { dateToISODate, ISODate, TidenesEnde } from '@sif/utils';
import { BrukerdialogOppgaveDto, OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import dayjs from 'dayjs';

import { Oppgave, ParsedOppgaveBase } from '../../../types/Oppgave';

/** Parser én oppgave fra backend til en ferdig tolket frontend-oppgave. */
export type OppgaveParser = (oppgave: BrukerdialogOppgaveDto) => Oppgave;

/** Brukeren må svare senest dagen før fristen går ut. */
const getSisteDatoEnKanSvare = (svarfrist: ISODate): ISODate => dateToISODate(dayjs(svarfrist).subtract(1, 'day'));

const getOppgaveStatusEnum = (status: string): OppgaveStatus => {
    switch (status) {
        case 'LØST':
            return OppgaveStatus.LØST;
        case 'ULØST':
            return OppgaveStatus.ULØST;
        case 'AVBRUTT':
            return OppgaveStatus.AVBRUTT;
        case 'UTLØPT':
            return OppgaveStatus.UTLØPT;
        default:
            throw new Error(`Ukjent oppgavestatus: ${status}`);
    }
};

export const getOppgaveBaseProps = (oppgave: BrukerdialogOppgaveDto): Omit<ParsedOppgaveBase, 'parsedOppgavetype'> => {
    const løstDato = oppgave.løstDato ? dayjs.utc(oppgave.løstDato).toDate() : undefined;
    const opprettetDato = dayjs.utc(oppgave.opprettetDato).toDate();
    const frist: ISODate = dateToISODate(oppgave.frist || TidenesEnde);
    return {
        oppgavetype: oppgave.oppgavetype,
        oppgaveReferanse: oppgave.oppgaveReferanse,
        status: getOppgaveStatusEnum(oppgave.status),
        opprettetDato,
        løstDato,
        ytelsetype: oppgave.ytelsetype,
        frist: getSisteDatoEnKanSvare(frist),
    };
};
