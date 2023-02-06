import { DateRange, Duration, ISODateRange } from '@navikt/sif-common-utils';

export interface K9Sak2ArbeidstidPeriode {
    jobberNormaltTimerPerDag: Duration;
    faktiskArbeidTimerPerDag: Duration;
}

export interface K9Sak2ArbeidstidPeriodeMap {
    [key: ISODateRange]: K9Sak2ArbeidstidPeriode;
}

export interface K9Sak2ArbeidstidInfo {
    perioder: K9Sak2ArbeidstidPeriodeMap;
}

export type K9Sak2Arbeidstaker = {
    norskIdentitetsnummer?: string;
    organisasjonsnummer: string;
    arbeidstidInfo: K9Sak2ArbeidstidInfo;
};

export interface K9Sak2Arbeidstid {
    arbeidstakerList?: K9Sak2Arbeidstaker[];
    frilanserArbeidstidInfo?: K9Sak2ArbeidstidInfo;
    selvstendigNæringsdrivendeArbeidstidInfo?: K9Sak2ArbeidstidInfo;
}

export interface K9Sak2Barn {
    fødselsdato: Date;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    aktørId: string;
    identitetsnummer: string;
}
export interface K9Sak2OpptjeningAktivitetFrilanser {
    startdato: Date;
    sluttdato?: Date;
    jobberFortsattSomFrilanser: boolean;
}

interface K9Sak2Ytelse {
    type: 'PLEIEPENGER_SYKT_BARN';
    barn: { fødselsdato?: Date; norskIdentitetsnummer: string };
    søknadsperioder: DateRange[];
    opptjeningAktivitet: {
        frilanser?: K9Sak2OpptjeningAktivitetFrilanser;
    };
    arbeidstid: K9Sak2Arbeidstid;
}

export interface K9Sak2 {
    søknadId: string;
    språk: string;
    mottattDato: Date;
    barn: K9Sak2Barn;
    søker: {
        norskIdentitetsnummer: string;
    };
    ytelse: K9Sak2Ytelse;
}
