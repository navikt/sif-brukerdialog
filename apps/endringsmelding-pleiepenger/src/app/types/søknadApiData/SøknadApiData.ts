import { ISODate, ISODateRangeMap, ISODuration } from '@navikt/sif-common-utils/lib';

export type ArbeidstidPeriodeApiData = {
    jobberNormaltTimerPerDag: ISODuration;
    faktiskArbeidTimerPerDag: ISODuration;
    _endretProsent?: number;
    _opprinneligNormaltPerDag: ISODuration;
    _opprinneligFaktiskPerDag: ISODuration;
};

export type ArbeidstidPeriodeApiDataMap = ISODateRangeMap<ArbeidstidPeriodeApiData>;

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

// export enum LovbestemtFerieEndringType {
//     'ny' = 'ny',
//     'slettet' = 'slettet',
// }

export const FERIE_LAGTTIL_DURATION: ISODuration = 'PT7H30M';
export const FERIE_FJERNET_DURATION: ISODuration = 'PT0S';

export type LovbestemtFerieApiData = {
    perioder: ISODateRangeMap<ISODuration>;
    dagerLagtTil: ISODate[];
    dagerFjernet: ISODate[];
    perioderLagtTil: ISODateRangeMap<ISODuration>;
    perioderFjernet: ISODateRangeMap<ISODuration>;
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
    };
}

export interface SøknadApiData {
    id: string;
    språk: string;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    ytelse: YtelseApiData;
}
