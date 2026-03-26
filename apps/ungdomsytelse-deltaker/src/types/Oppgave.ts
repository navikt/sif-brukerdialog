import { DateRange } from '@navikt/sif-common-formik-ds';
import { OpenDateRange } from '@navikt/sif-common-utils';
import {
    BrukerdialogOppgaveDto,
    OppgaveStatus,
    RapportertInntektDto,
    RegisterinntektDto,
    SvarPåVarselDto,
} from '@navikt/ung-brukerdialog-api';

export enum ParsedOppgavetype {
    BEKREFT_AVVIK_REGISTERINNTEKT = 'BEKREFT_AVVIK_REGISTERINNTEKT',
    BEKREFT_ENDRET_STARTDATO = 'BEKREFT_ENDRET_STARTDATO',
    BEKREFT_ENDRET_SLUTTDATO = 'BEKREFT_ENDRET_SLUTTDATO',
    BEKREFT_MELDT_UT = 'BEKREFT_MELDT_UT',
    BEKREFT_ENDRET_START_OG_SLUTTDATO = 'BEKREFT_ENDRET_START_OG_SLUTTDATO',
    BEKREFT_FJERNET_PERIODE = 'BEKREFT_FJERNET_PERIODE',
    RAPPORTER_INNTEKT = 'RAPPORTER_INNTEKT',
    SØK_YTELSE = 'SØK_YTELSE',
}

export type RapportertInntektRespons = Omit<RapportertInntektDto, 'fraOgMed' | 'tilOgMed'> & {
    type: 'RAPPORTERT_INNTEKT';
    fraOgMed: Date;
    tilOgMed: Date;
};

export type SvarPåVarselRespons = SvarPåVarselDto & {
    type: 'VARSEL_SVAR';
};
export interface ParsedOppgaveBase extends Omit<
    BrukerdialogOppgaveDto,
    'oppgavetype' | 'opprettetDato' | 'løstDato' | 'åpnetDato' | 'lukketDato' | 'oppgavetypeData' | 'frist' | 'respons'
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

export interface ParsedRapportertInntektOppgave extends ParsedOppgaveBase {
    respons?: RapportertInntektRespons;
}

export interface AvvikRegisterinntektOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        registerinntekt: RegisterinntektDto;
        gjelderDelerAvMåned: boolean;
    };
    respons?: SvarPåVarselRespons;
}

export interface EndretStartdatoOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO;
    oppgavetypeData: {
        forrigeStartdato: Date;
        nyStartdato: Date;
    };
    respons?: SvarPåVarselRespons;
}
export interface EndretSluttdatoOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO;
    oppgavetypeData: {
        forrigeSluttdato: Date;
        nySluttdato: Date;
    };
    respons?: SvarPåVarselRespons;
}

export interface MeldtUtOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT;
    oppgavetypeData: {
        sluttdato: Date;
    };
    respons?: SvarPåVarselRespons;
}

export interface EndretStartOgSluttdatoOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO;
    oppgavetypeData: {
        forrigePeriode: OpenDateRange;
        nyPeriode: DateRange;
    };
    respons?: SvarPåVarselRespons;
}

export interface FjernetPeriodeOppgave extends ParsedOppgaveBase {
    oppgavetype: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE;
    respons?: SvarPåVarselRespons;
}

export type BekreftelseOppgave =
    | EndretSluttdatoOppgave
    | EndretStartdatoOppgave
    | EndretStartOgSluttdatoOppgave
    | FjernetPeriodeOppgave
    | MeldtUtOppgave
    | (AvvikRegisterinntektOppgave & {
          respons?: SvarPåVarselRespons;
      });

export interface RapporterInntektOppgave extends ParsedRapportertInntektOppgave {
    oppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
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
    | MeldtUtOppgave
    | EndretStartOgSluttdatoOppgave
    | FjernetPeriodeOppgave
    | AvvikRegisterinntektOppgave
    | RapporterInntektOppgave;
