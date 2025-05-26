import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

interface oppgaveBase {
    oppgaveReferanse: string;
    oppgavetype: Oppgavetype;
    opprettetDato: Date;
    status: OppgaveStatus;
    løstDato?: Date;
    svarfrist: Date;
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
export interface RapporterInntektOppgave extends oppgaveBase {
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed?: Date;
    };
}

export type Oppgave = KorrigertInntektOppgave | EndretProgramperiodeOppgave | RapporterInntektOppgave;
