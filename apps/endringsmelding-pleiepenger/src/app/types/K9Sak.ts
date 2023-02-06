import { DateRange, Duration, ISODateRange } from '@navikt/sif-common-utils';

export interface K9SakBarn {
    fødselsdato: Date;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    aktørId: string;
    identitetsnummer: string;
}

interface K9SakArbeidstidPeriode {
    jobberNormaltTimerPerDag: Duration;
    faktiskArbeidTimerPerDag: Duration;
}

export interface K9SakArbeidstidPeriodeMap {
    [key: ISODateRange]: K9SakArbeidstidPeriode;
}

export interface K9SakArbeidstidInfo {
    perioder: K9SakArbeidstidPeriodeMap;
}

export type K9SakArbeidstaker = {
    norskIdentitetsnummer?: string;
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
interface K9SakOpptjeningAktivitetFrilanser {
    startdato: Date;
    sluttdato?: Date;
    jobberFortsattSomFrilanser: boolean;
}

interface K9SakYtelse {
    type: 'PLEIEPENGER_SYKT_BARN';
    barn: { fødselsdato?: Date; norskIdentitetsnummer: string };
    søknadsperioder: DateRange[];
    opptjeningAktivitet: {
        frilanser?: K9SakOpptjeningAktivitetFrilanser;
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
