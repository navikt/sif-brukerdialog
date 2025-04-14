import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

interface oppgaveBase {
    oppgaveReferanse: string;
    oppgavetype: Oppgavetype;
    opprettetDato: Date;
    status: OppgaveStatus;
    løstDato?: Date;
    svarfrist: Date;
}

export interface EndreStartdatoOppgave extends oppgaveBase {
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO;
    oppgavetypeData: {
        nyStartdato: Date;
    };
}
export interface EndreSluttdatoOppgave extends oppgaveBase {
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO;
    oppgavetypeData: {
        nySluttdato: Date;
    };
}

export interface Registerinntekt {
    arbeidOgFrilansInntekter: Array<{
        arbeidsgiver: string;
        inntekt: number;
    }>;
    ytelseInntekter: Array<{
        ytelsetype: string;
        inntekt: number;
    }>;
}
export interface KorrigertInntektOppgave extends oppgaveBase {
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        registerinntekt: Registerinntekt;
    };
}

export interface EndretProgramperiodeOppgave extends oppgaveBase {
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed?: Date;
    };
}

export type Oppgave =
    | EndreStartdatoOppgave
    | EndreSluttdatoOppgave
    | KorrigertInntektOppgave
    | EndretProgramperiodeOppgave;
