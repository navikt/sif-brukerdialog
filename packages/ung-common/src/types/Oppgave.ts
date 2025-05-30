import { BekreftelseDto, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

interface OppgaveBase {
    oppgaveReferanse: string;
    oppgavetype: Oppgavetype;
    opprettetDato: Date;
    status: OppgaveStatus;
    løstDato?: Date;
    svarfrist: Date;
}

export interface BekreftelseOppgave extends OppgaveBase {
    bekreftelse?: BekreftelseDto;
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
export interface KorrigertInntektOppgave extends BekreftelseOppgave {
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        registerinntekt: Registerinntekt;
    };
}

export enum EndretProgramperiodeEndringType {
    /** Startdato endret */
    'ENDRET_STARTDATO' = 'ENDRET_STARTDATO',
    /** Sluttdato endret */
    'ENDRET_SLUTTDATO' = 'ENDRET_SLUTTDATO',
    /** Sluttdato satt første gang */
    'NY_SLUTTDATO' = 'NY_SLUTTDATO',
}

export interface EndretProgramperiodeOppgave extends BekreftelseOppgave {
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE;
    oppgavetypeData: {
        programperiode: {
            fraOgMed: Date;
            tilOgMed?: Date;
        };
        forrigeProgramperiode?: {
            fraOgMed: Date;
            tilOgMed?: Date;
        };
        endringType: EndretProgramperiodeEndringType;
    };
}
export interface RapporterInntektOppgave extends OppgaveBase {
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
    };
}

export interface SendSøknadOppgave extends OppgaveBase {
    oppgavetype: Oppgavetype.SEND_SØKNAD;
    oppgavetypeData: {
        fomDato: Date;
    };
}

export type Oppgave =
    | KorrigertInntektOppgave
    | EndretProgramperiodeOppgave
    | RapporterInntektOppgave
    | SendSøknadOppgave;
