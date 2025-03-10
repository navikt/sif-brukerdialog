import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

interface oppgaveBase {
    oppgavetype: Oppgavetype;
    id: string;
    opprettetDato: Date;
    status: OppgaveStatus;
    løstDato?: Date;
    svarfrist: Date;
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

export interface KorrigertInntektOppgave extends oppgaveBase {
    oppgavetype: Oppgavetype.BEKREFT_KORRIGERT_INNTEKT;
    oppgavetypeData: {
        rapportertInntekt?: number;
        korrigertInntekt: number;
        fraOgMed: Date;
        tilOgMed: Date;
    };
}

export type Oppgave = EndreStartdatoOppgave | EndreSluttdatoOppgave | KorrigertInntektOppgave;
