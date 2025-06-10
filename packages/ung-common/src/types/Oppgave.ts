import {
    BekreftelseDto,
    OppgaveDto,
    OppgaveStatus,
    Oppgavetype,
    RapportertInntektPeriodeinfoDto,
    RegisterinntektDto,
} from '@navikt/ung-deltakelse-opplyser-api';

export interface OppgaveBase
    extends Omit<OppgaveDto, 'opprettetDato' | 'løstDato' | 'åpnetDato' | 'lukketDato' | 'oppgavetypeData'> {
    oppgaveReferanse: string;
    oppgavetype: Oppgavetype;
    opprettetDato: Date;
    status: OppgaveStatus;
    løstDato?: Date;
    svarfrist: Date;
    åpnetDato?: Date;
    lukketDato?: Date;
}

export interface BekreftelseOppgave extends OppgaveBase {
    bekreftelse?: BekreftelseDto;
}
export interface KorrigertInntektOppgave extends BekreftelseOppgave {
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        registerinntekt: RegisterinntektDto;
    };
}

export interface EndretStartdatoOppgave extends BekreftelseOppgave {
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO;
    oppgavetypeData: {
        forrigeStartdato: Date;
        nyStartdato: Date;
    };
}
export interface EndretSluttdatoOppgave extends BekreftelseOppgave {
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO;
    oppgavetypeData: {
        forrigeSluttdato?: Date;
        nySluttdato: Date;
    };
}
export interface RapporterInntektOppgave extends OppgaveBase {
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        rapportertInntekt?: Pick<RapportertInntektPeriodeinfoDto, 'arbeidstakerOgFrilansInntekt'>;
    };
}

export interface SøkYtelseOppgave extends OppgaveBase {
    oppgavetype: Oppgavetype.SØK_YTELSE;
    oppgavetypeData: {
        fomDato: Date;
    };
}

export type Oppgave =
    | KorrigertInntektOppgave
    | EndretSluttdatoOppgave
    | EndretStartdatoOppgave
    | RapporterInntektOppgave
    | SøkYtelseOppgave;
