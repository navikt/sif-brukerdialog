import { ISODate, ISODateRangeMap, ISODuration } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from './_ArbeiderIPeriodenSvar';
import { Arbeidsforhold } from './_Arbeidsforhold';
import { EndringType } from './EndringType';
import { LovbestemtFerieType } from './LovbestemtFerieType';

export type ArbeidstidPeriodeApiData = {
    jobberNormaltTimerPerDag: ISODuration;
    faktiskArbeidTimerPerDag: ISODuration;
    _endretProsent?: number;
    _opprinneligNormaltPerDag: ISODuration;
    _opprinneligFaktiskPerDag?: ISODuration;
};

export type ArbeidstidPeriodeApiDataMap = ISODateRangeMap<ArbeidstidPeriodeApiData>;

export interface ArbeidstakerApiData {
    organisasjonsnummer: string;
    arbeidstidInfo: {
        perioder: ArbeidstidPeriodeApiDataMap;
    };
    _erUkjentArbeidsaktivitet: boolean;
    _arbeiderIPerioden?: ArbeiderIPeriodenSvar;
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

export type LovbestemtFerieApiData = {
    perioder: ISODateRangeMap<LovbestemtFerieType>;
};

interface BarnApiData {
    fødselsdato?: ISODate;
    norskIdentitetsnummer: string;
}

interface YtelseApiData {
    type: 'PLEIEPENGER_SYKT_BARN';
    arbeidstid?: ArbeidstidApiData;
    lovbestemtFerie?: LovbestemtFerieApiData;
    barn: BarnApiData;
    dataBruktTilUtledning: {
        soknadDialogCommitSha: string;
        valgteEndringer: EndringType[];
        ukjentArbeidsforhold?: Arbeidsforhold[];
    };
}

export interface SøknadApiData {
    id: string;
    språk: string;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    ytelse: YtelseApiData;
}
