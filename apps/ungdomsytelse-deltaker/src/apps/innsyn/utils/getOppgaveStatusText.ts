import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveBase, OppgaveStatus } from '@navikt/ung-common';

const renderDatoOgKlokkeslett = (dato?: Date) => {
    return dato ? dateFormatter.compactWithTime(dato) : '';
};

export const getOppgaveStatusText = (oppgave: OppgaveBase): string => {
    switch (oppgave.status) {
        case OppgaveStatus.LØST:
            return `Sendt inn ${renderDatoOgKlokkeslett(oppgave.løstDato)}`;
        case OppgaveStatus.ULØST:
            return `Frist: ${dateFormatter.full(oppgave.svarfrist)}`;
        case OppgaveStatus.AVBRUTT:
            return 'Avbrutt';
        case OppgaveStatus.LUKKET:
            return `Sendt inn ${renderDatoOgKlokkeslett(oppgave.lukketDato)}`;
        case OppgaveStatus.UTLØPT:
            return `Utløpt`;
    }
};
