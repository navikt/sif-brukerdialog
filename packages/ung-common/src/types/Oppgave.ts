import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

interface oppgaveBase {
    id: string;
    opprettetDato: Date;
    status: OppgaveStatus;
    løstDato?: Date;
    oppgavetype: Oppgavetype;
}

export interface EndreStartdatoOppgave extends oppgaveBase {
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO;
    oppgavetypeData: {
        nyStartdato: Date;
        veilederRef: string;
        meldingFraVeileder?: string;
    };
}
export interface EndreSluttdatoOppgave extends oppgaveBase {
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO;
    oppgavetypeData: {
        nySluttdato: Date;
        veilederRef: string;
        meldingFraVeileder?: string;
    };
}

export type Oppgave = EndreStartdatoOppgave | EndreSluttdatoOppgave;
