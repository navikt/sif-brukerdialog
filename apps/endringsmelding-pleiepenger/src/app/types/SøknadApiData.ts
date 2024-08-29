import { ISODate, ISODateRange, ISODateRangeMap, ISODuration } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from './ArbeiderIPeriodenSvar';
import { LovbestemtFerieType } from './LovbestemtFerieType';
import { ValgteEndringer } from './ValgteEndringer';

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
    organisasjonsnavn: string;
    arbeidstidInfo: {
        perioder: ArbeidstidPeriodeApiDataMap;
    };
    _erUkjentArbeidsforhold: boolean;
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

export interface KursperiodeApiData {
    kursperiode: ISODateRange;
    avreise: ISODate;
    hjemkomst: ISODate;
    begrunnelseReisetidTil?: string;
    begrunnelseReisetidHjem?: string;
}

export interface KursholderApiData {
    holder: string;
    institusjonUuid: string;
}

export interface KursApiData {
    kursholder: KursholderApiData;
    perioder: KursperiodeApiData[];
}

interface BarnApiData {
    fødselsdato?: ISODate;
    norskIdentitetsnummer: string;
}

export interface DataBruktTilUtledningApiData {
    ukjenteArbeidsforhold?: UkjentArbeidsforholdApiData[];
}

export interface DataBruktTilUtledningApiDataAnnetData {
    valgteEndringer: ValgteEndringer;
}

export type DataBruktTilUtledningApiDataAnnetDataJsonString = string;

interface YtelseApiData {
    type: 'PLEIEPENGER_SYKT_BARN';
    arbeidstid?: ArbeidstidApiData;
    lovbestemtFerie?: LovbestemtFerieApiData;
    barn: BarnApiData;
    dataBruktTilUtledning: DataBruktTilUtledningApiData;
    annetDataBruktTilUtledning: {
        annetData: DataBruktTilUtledningApiDataAnnetDataJsonString;
    };
}

interface UkjentArbeidsforholdApiDataBase {
    organisasjonsnummer: string;
    organisasjonsnavn: string;
    erAnsatt: boolean;
}

interface UkjentArbeidsforholdApiDataErAnsatt extends UkjentArbeidsforholdApiDataBase {
    erAnsatt: true;
    normalarbeidstid: {
        timerPerUke: ISODuration;
    };
    arbeiderIPerioden: ArbeiderIPeriodenSvar;
}
interface UkjentArbeidsforholdApiDataErIkkeAnsatt extends UkjentArbeidsforholdApiDataBase {
    erAnsatt: false;
}

export type UkjentArbeidsforholdApiData = UkjentArbeidsforholdApiDataErAnsatt | UkjentArbeidsforholdApiDataErIkkeAnsatt;

export interface SøknadApiData {
    søkerNorskIdent: string;
    id: string;
    språk: string;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    ytelse: YtelseApiData;
}
