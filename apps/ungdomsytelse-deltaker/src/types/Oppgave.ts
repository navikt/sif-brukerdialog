import {
    BekreftelseDto,
    OppgaveDto,
    OppgaveStatus,
    RapportertInntektPeriodeinfoDto,
    RegisterinntektDto,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export enum ParsedOppgavetype {
    BEKREFT_AVVIK_REGISTERINNTEKT = 'BEKREFT_AVVIK_REGISTERINNTEKT',
    BEKREFT_ENDRET_STARTDATO = 'BEKREFT_ENDRET_STARTDATO',
    BEKREFT_ENDRET_SLUTTDATO = 'BEKREFT_ENDRET_SLUTTDATO',
    BEKREFT_ENDRET_START_OG_SLUTTDATO = 'BEKREFT_ENDRET_START_OG_SLUTTDATO',
    BEKREFT_FJERNET_PERIODE = 'BEKREFT_FJERNET_PERIODE',
    RAPPORTER_INNTEKT = 'RAPPORTER_INNTEKT',
    SØK_YTELSE = 'SØK_YTELSE',
}
export interface ParsedOppgaveBase extends Omit<
    OppgaveDto,
    'oppgavetype' | 'opprettetDato' | 'løstDato' | 'åpnetDato' | 'lukketDato' | 'oppgavetypeData' | 'frist'
> {
    oppgaveReferanse: string;
    oppgavetype: ParsedOppgavetype;
    opprettetDato: Date;
    status: OppgaveStatus;
    løstDato?: Date;
    sisteDatoEnKanSvare: Date /** Siste dag for innlevering */;
    åpnetDato?: Date;
    lukketDato?: Date;
}

export interface AvvikRegisterinntektOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        registerinntekt: RegisterinntektDto;
        gjelderDelerAvMåned: boolean;
    };
}

export interface EndretStartdatoOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO;
    oppgavetypeData: {
        forrigeStartdato: Date;
        nyStartdato: Date;
    };
}
export interface EndretSluttdatoOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO;
    oppgavetypeData: {
        forrigeSluttdato?: Date;
        nySluttdato: Date;
    };
}

export interface EndretStartOgSluttdatoOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO;
    oppgavetypeData: {
        forrigePeriode: {
            fraOgMed: Date;
            tilOgMed?: Date;
        };
        nyPeriode: {
            fraOgMed: Date;
            tilOgMed?: Date;
        };
    };
}

export interface FjernetPeriodeOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE;
}

export type BekreftelseOppgave =
    | EndretSluttdatoOppgave
    | EndretStartdatoOppgave
    | EndretStartOgSluttdatoOppgave
    | (AvvikRegisterinntektOppgave & {
          bekreftelse?: BekreftelseDto;
      });

export interface RapporterInntektOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        rapportertInntekt?: Pick<RapportertInntektPeriodeinfoDto, 'arbeidstakerOgFrilansInntekt'>;
        gjelderDelerAvMåned: boolean;
    };
}

export interface SøkYtelseOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.SØK_YTELSE;
    oppgavetypeData: {
        fomDato: Date;
    };
}

export type Oppgave =
    | SøkYtelseOppgave
    | EndretStartdatoOppgave
    | EndretSluttdatoOppgave
    | EndretStartOgSluttdatoOppgave
    | FjernetPeriodeOppgave
    | AvvikRegisterinntektOppgave
    | RapporterInntektOppgave;
