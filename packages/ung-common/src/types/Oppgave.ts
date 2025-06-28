import { DeltakerApi } from '@navikt/ung-deltakelse-opplyser-api';

export interface OppgaveBase
    extends Omit<
        DeltakerApi.OppgaveDto,
        'opprettetDato' | 'løstDato' | 'åpnetDato' | 'lukketDato' | 'oppgavetypeData' | 'frist'
    > {
    oppgaveReferanse: string;
    oppgavetype: DeltakerApi.Oppgavetype;
    opprettetDato: Date;
    status: DeltakerApi.OppgaveStatus;
    løstDato?: Date;
    frist: Date;
    åpnetDato?: Date;
    lukketDato?: Date;
}

export interface BekreftelseOppgave extends OppgaveBase {
    bekreftelse?: DeltakerApi.BekreftelseDto;
}
export interface KorrigertInntektOppgave extends BekreftelseOppgave {
    oppgavetype: DeltakerApi.Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        registerinntekt: DeltakerApi.RegisterinntektDto;
    };
}

export interface EndretStartdatoOppgave extends BekreftelseOppgave {
    oppgavetype: DeltakerApi.Oppgavetype.BEKREFT_ENDRET_STARTDATO;
    oppgavetypeData: {
        forrigeStartdato: Date;
        nyStartdato: Date;
    };
}
export interface EndretSluttdatoOppgave extends BekreftelseOppgave {
    oppgavetype: DeltakerApi.Oppgavetype.BEKREFT_ENDRET_SLUTTDATO;
    oppgavetypeData: {
        forrigeSluttdato?: Date;
        nySluttdato: Date;
    };
}
export interface RapporterInntektOppgave extends OppgaveBase {
    oppgavetype: DeltakerApi.Oppgavetype.RAPPORTER_INNTEKT;
    oppgavetypeData: {
        fraOgMed: Date;
        tilOgMed: Date;
        rapportertInntekt?: Pick<DeltakerApi.RapportertInntektPeriodeinfoDto, 'arbeidstakerOgFrilansInntekt'>;
    };
}

export interface SøkYtelseOppgave extends OppgaveBase {
    oppgavetype: DeltakerApi.Oppgavetype.SØK_YTELSE;
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
