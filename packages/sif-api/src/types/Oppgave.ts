import { DateRange, ISODate, OpenDateRange } from '@sif/utils';
import {
    BrukerdialogOppgaveDto,
    OppgaveStatus,
    OppgaveYtelsetype,
    RapportertInntektDto,
    RegisterinntektDto,
    SvarPåVarselDto,
} from '@navikt/ung-brukerdialog-api';

export enum ParsedOppgavetype {
    BEKREFT_BOSTED = 'BEKREFT_BOSTED',
    BEKREFT_OPPHOR_VED_MAKSDATO = 'BEKREFT_OPPHOR_VED_MAKSDATO',
    BEKREFT_AVVIK_REGISTERINNTEKT = 'BEKREFT_AVVIK_REGISTERINNTEKT',
    BEKREFT_ENDRET_STARTDATO = 'BEKREFT_ENDRET_STARTDATO',
    BEKREFT_ENDRET_SLUTTDATO = 'BEKREFT_ENDRET_SLUTTDATO',
    BEKREFT_MELDT_UT = 'BEKREFT_MELDT_UT',
    BEKREFT_ENDRET_START_OG_SLUTTDATO = 'BEKREFT_ENDRET_START_OG_SLUTTDATO',
    BEKREFT_FJERNET_PERIODE = 'BEKREFT_FJERNET_PERIODE',
    RAPPORTER_INNTEKT = 'RAPPORTER_INNTEKT',
    SØK_YTELSE = 'SØK_YTELSE',
}

export type RapportertInntektRespons = RapportertInntektDto & {
    type: 'RAPPORTERT_INNTEKT';
};

export type SvarPåVarselRespons = SvarPåVarselDto & {
    type: 'VARSEL_SVAR';
};
export interface ParsedOppgaveBase extends Omit<
    BrukerdialogOppgaveDto,
    'oppgavetypeData' | 'respons' | 'frist' | 'løstDato' | 'opprettetDato'
> {
    oppgaveReferanse: string;
    parsedOppgavetype: ParsedOppgavetype;
    status: OppgaveStatus;
    frist: Date;
    løstDato?: Date;
    opprettetDato: Date;
    sisteDatoEnKanSvare: Date;
}

export interface ParsedRapportertInntektOppgave extends ParsedOppgaveBase {
    respons?: RapportertInntektRespons;
}

export interface AvvikRegisterinntektOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT;
    oppgavetypeData: {
        fraOgMed: ISODate;
        tilOgMed: ISODate;
        registerinntekt: RegisterinntektDto;
        gjelderDelerAvMåned: boolean;
    };
    respons?: SvarPåVarselRespons;
}

export interface EndretStartdatoOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO;
    oppgavetypeData: {
        forrigeStartdato: ISODate;
        nyStartdato: ISODate;
    };
    respons?: SvarPåVarselRespons;
}
export interface BostedVilkårOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_BOSTED;
    oppgavetypeData: {
        periode: DateRange;
        erBosattITrondheim: boolean;
    };
    respons?: SvarPåVarselRespons;
}

export interface EndretSluttdatoOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO;
    oppgavetypeData: {
        forrigeSluttdato: ISODate;
        nySluttdato: ISODate;
    };
    respons?: SvarPåVarselRespons;
}

export interface MeldtUtOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT;
    oppgavetypeData: {
        sluttdato: ISODate;
    };
    respons?: SvarPåVarselRespons;
}

export interface EndretStartOgSluttdatoOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO;
    oppgavetypeData: {
        forrigePeriode: OpenDateRange;
        nyPeriode: DateRange;
    };
    respons?: SvarPåVarselRespons;
}

export interface FjernetPeriodeOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE;
    respons?: SvarPåVarselRespons;
}

export interface OpphorVedMaksdatoOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO;
    oppgavetypeData: {
        maksdato: ISODate;
        sluttdato: ISODate;
    };
    respons?: SvarPåVarselRespons;
}

export type BekreftelseOppgave =
    | EndretSluttdatoOppgave
    | EndretStartdatoOppgave
    | EndretStartOgSluttdatoOppgave
    | FjernetPeriodeOppgave
    | MeldtUtOppgave
    | OpphorVedMaksdatoOppgave
    | BostedVilkårOppgave
    | (AvvikRegisterinntektOppgave & {
          respons?: SvarPåVarselRespons;
      });

export interface RapporterInntektOppgave extends ParsedRapportertInntektOppgave {
    oppgaveYtelsetype: OppgaveYtelsetype;
    parsedOppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT;
    oppgavetypeData: {
        fraOgMed: ISODate;
        tilOgMed: ISODate;
        gjelderDelerAvMåned: boolean;
    };
}

export interface SøkYtelseOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.SØK_YTELSE;
    oppgavetypeData: {
        fomDato: ISODate;
    };
}

export type Oppgave =
    | AvvikRegisterinntektOppgave
    | BostedVilkårOppgave
    | EndretSluttdatoOppgave
    | EndretStartdatoOppgave
    | EndretStartOgSluttdatoOppgave
    | FjernetPeriodeOppgave
    | MeldtUtOppgave
    | OpphorVedMaksdatoOppgave
    | RapporterInntektOppgave
    | SøkYtelseOppgave;
