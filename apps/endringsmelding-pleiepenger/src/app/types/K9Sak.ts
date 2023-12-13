import { UtenlandsoppholdÅrsak } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { DateRange, Duration, ISODateRange, ISODateRangeMap } from '@navikt/sif-common-utils';

export interface K9SakArbeidstidPeriode {
    jobberNormaltTimerPerDag: Duration;
    faktiskArbeidTimerPerDag: Duration;
}

export type K9SakArbeidstidPeriodeMap = ISODateRangeMap<K9SakArbeidstidPeriode>;

export interface K9SakArbeidstidInfo {
    perioder: K9SakArbeidstidPeriodeMap;
}

export type K9SakArbeidstaker = {
    organisasjonsnummer: string;
    arbeidstidInfo: K9SakArbeidstidInfo;
};

export interface K9SakArbeidstid {
    arbeidstakerList?: K9SakArbeidstaker[];
    frilanserArbeidstidInfo?: K9SakArbeidstidInfo;
    selvstendigNæringsdrivendeArbeidstidInfo?: K9SakArbeidstidInfo;
}

export interface K9SakBarn {
    fødselsdato: Date;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    aktørId: string;
    identitetsnummer: string;
}

export interface K9SakLovbestemtFerie extends DateRange {
    skalHaFerie: boolean;
}

export interface K9SakUtenlandsopphold {
    id: ISODateRange;
    periode: DateRange;
    land: string;
    årsak: UtenlandsoppholdÅrsak;
}

interface K9SakYtelse {
    type: 'PLEIEPENGER_SYKT_BARN';
    barn: { fødselsdato?: Date; norskIdentitetsnummer: string };
    søknadsperioder: DateRange[];
    lovbestemtFerie: {
        perioder: K9SakLovbestemtFerie[];
    };
    utenlandsopphold: {
        perioder: K9SakUtenlandsopphold[];
    };
    opptjeningAktivitet: {
        frilanser?: {
            startdato: Date;
            sluttdato?: Date;
            jobberFortsattSomFrilanser: boolean;
        };
    };
    arbeidstid: K9SakArbeidstid;
}

export interface K9Sak {
    søknadId: string;
    språk: string;
    mottattDato: Date;
    barn: K9SakBarn;
    søker: {
        norskIdentitetsnummer: string;
    };
    ytelse: K9SakYtelse;
}

export const isK9Sak = (sak: any): sak is K9Sak => {
    return sak && sak.ytelse !== undefined;
};

export interface UgyldigK9SakFormat {
    erUgyldigK9SakFormat: true;
}

export const isUgyldigK9SakFormat = (sak: any): sak is UgyldigK9SakFormat => {
    return sak && sak.erUgyldigK9SakFormat === true;
};
