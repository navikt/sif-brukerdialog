import { DateRange, OpenDateRange } from '@navikt/sif-common-utils';
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
    'opprettetDato' | 'løstDato' | 'åpnetDato' | 'lukketDato' | 'oppgavetypeData' | 'frist' | 'respons'
> {
    oppgaveReferanse: string;
    parsedOppgavetype: ParsedOppgavetype;
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
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        registerinntekt: RegisterinntektDto;
        gjelderDelerAvMåned: boolean;
    };
    respons?: SvarPåVarselRespons;
}

export interface EndretStartdatoOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO;
    oppgavetypeData: {
        forrigeStartdato: Date;
        nyStartdato: Date;
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
        forrigeSluttdato: Date;
        nySluttdato: Date;
    };
    respons?: SvarPåVarselRespons;
}

export interface MeldtUtOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT;
    oppgavetypeData: {
        sluttdato: Date;
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
        maksdato: Date;
        sluttdato: Date;
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
        fraOgMed: Date;
        tilOgMed: Date;
        gjelderDelerAvMåned: boolean;
    };
}

export interface SøkYtelseOppgave extends ParsedOppgaveBase {
    parsedOppgavetype: ParsedOppgavetype.SØK_YTELSE;
    oppgavetypeData: {
        fomDato: Date;
    };
}

export type Oppgave =
    | SøkYtelseOppgave
    | BostedVilkårOppgave
    | EndretStartdatoOppgave
    | EndretSluttdatoOppgave
    | MeldtUtOppgave
    | EndretStartOgSluttdatoOppgave
    | FjernetPeriodeOppgave
    | AvvikRegisterinntektOppgave
    | OpphorVedMaksdatoOppgave
    | RapporterInntektOppgave;
