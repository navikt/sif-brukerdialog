import { ISODate, ISODateRange, ISODuration } from '@navikt/sif-common-utils/lib';

export type ArbeidstidPeriodeApiData = {
    jobberNormaltTimerPerDag: ISODuration;
    faktiskArbeidTimerPerDag: ISODuration;
};

export type ArbeidstidPeriodeApiDataMap = {
    [key: ISODateRange]: ArbeidstidPeriodeApiData;
};

export interface ArbeidstakerApiData {
    norskIdentitetsnummer?: string;
    organisasjonsnummer: string;
    arbeidstidInfo: {
        perioder: ArbeidstidPeriodeApiDataMap;
    };
}

export interface ArbeidstidApiData {
    arbeidstakerList: ArbeidstakerApiData[];
    frilanserArbeidstidInfo?: {
        perioder: ArbeidstidPeriodeApiDataMap;
    };
    selvstendigNæringsdrivendeArbeidstidInfo?: {
        perioder: ArbeidstidPeriodeApiDataMap;
    };
}

export interface BarnApiData {
    fødselsdato?: ISODate;
    norskIdentitetsnummer: string;
}

export interface YtelseApiData {
    type: 'PLEIEPENGER_SYKT_BARN';
    arbeidstid: ArbeidstidApiData;
    barn: BarnApiData;
}

export interface SøknadApiData {
    id: string;
    språk: string;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    ytelse: YtelseApiData;
}
