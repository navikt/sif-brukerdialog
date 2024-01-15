import { UtenlandsoppholdÅrsak } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { ISODate, ISODateRange, ISODateRangeMap, ISODuration } from '@navikt/sif-common-utils';
import { isObject } from 'formik';

export type K9FormatTilsynsordningPerioder = ISODateRangeMap<{ etablertTilsynTimerPerDag: ISODuration }>;

export interface K9FormatArbeidstidTid {
    jobberNormaltTimerPerDag: ISODuration;
    faktiskArbeidTimerPerDag: ISODuration;
}

export type K9FormatArbeidstidInfoPerioder = ISODateRangeMap<K9FormatArbeidstidTid>;

export interface K9FormatArbeidstaker {
    norskIdentitetsnummer: string | null;
    organisasjonsnummer: string;
    arbeidstidInfo: K9FormatArbeidstidInfo;
}

interface K9FormatOpptjeningAktivitetFrilanser {
    startdato: ISODate;
    sluttdato?: ISODate;
    jobberFortsattSomFrilanser: boolean;
}

interface K9FormatOpptjeningAktivitetSelvstendig {
    startdato: ISODate;
    sluttdato?: ISODate;
    organisasjonsnummer: string;
}

export type K9FormatUtenlandsoppholdPerioder = ISODateRangeMap<K9FormatUtenlandsopphold>;

export type K9SakLovbestemtFeriePeriode = {
    skalHaFerie: boolean;
};

export type K9FormatLovbestemtFeriePerioder = ISODateRangeMap<K9SakLovbestemtFeriePeriode>;

export interface K9FormatUtenlandsopphold {
    land: string;
    årsak: UtenlandsoppholdÅrsak;
}

interface K9FormatYtelseIkkeIBruk {
    endringsperiode: any;
    trekkKravPerioder: any;
    dataBruktTilUtledning: any; // Bekreftet opplysninger etc fra dialogen
    infoFraPunsj: any;
    bosteder: any;
    beredskap: any;
    nattevåk: any;
    uttak: any;
    omsorg: any;
}
export interface K9FormatYtelse {
    type: 'PLEIEPENGER_SYKT_BARN';
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato: ISODate | null;
    };
    søknadsperiode: ISODateRange[];
    lovbestemtFerie: {
        perioder: K9FormatLovbestemtFeriePerioder;
    };
    utenlandsopphold: {
        perioder: K9FormatUtenlandsoppholdPerioder;
    };
    opptjeningAktivitet: {
        frilanser?: K9FormatOpptjeningAktivitetFrilanser;
        selvstendigNæringsdrivende?: K9FormatOpptjeningAktivitetSelvstendig;
    };
    tilsynsordning: {
        perioder: K9FormatTilsynsordningPerioder;
    };
    arbeidstid: K9FormatArbeidstid;
}

export interface K9FormatBarn {
    fødselsdato: ISODate;
    fornavn: string;
    mellomnavn: string | null;
    etternavn: string;
    aktørId: string;
    identitetsnummer: string;
}

export interface K9FormatArbeidstidInfo {
    perioder?: K9FormatArbeidstidInfoPerioder;
}
export interface K9FormatArbeidstid {
    arbeidstakerList: K9FormatArbeidstaker[];
    frilanserArbeidstidInfo: K9FormatArbeidstidInfo | null;
    selvstendigNæringsdrivendeArbeidstidInfo: K9FormatArbeidstidInfo | null;
}

export interface K9Format {
    barn: K9FormatBarn;
    søknad: {
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        ytelse: K9FormatYtelse & K9FormatYtelseIkkeIBruk;
        språk: 'nb' | 'nn';
        journalposter: any;
        begrunnelseForInnsending: any;
    };
}
export interface K9FormatError {
    type: 'k9formatError';
    error: any;
}

export const isK9FormatError = (error: any): error is K9FormatError => {
    return error && isObject(error) && error.type === 'k9formatError';
};
