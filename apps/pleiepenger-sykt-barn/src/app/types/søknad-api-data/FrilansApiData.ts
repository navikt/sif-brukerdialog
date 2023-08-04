import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdApiData } from './ArbeidsforholdApiData';

export enum FrilansApiType {
    'INGEN_INNTEKT_FROM_FRILANSER' = 'INGEN_INNTEKT_FROM_FRILANSER',
    'KUN_HONORARARBEID_MISTER_IKKE_HONORAR' = 'KUN_HONORARARBEID_MISTER_IKKE_HONORAR',
    'KUN_FRILANSARBEID' = 'KUN_FRILANSARBEID',
    'KUN_HONORARARBEID_MISTER_HONORAR' = 'KUN_HONORARARBEID_MISTER_HONORAR',
    'FRILANSARBEID_OG_HONORARARBEID' = 'FRILANSARBEID_OG_HONORARARBEID',
}

export interface FrilansarbeidApiData {
    arbeidsforhold: ArbeidsforholdApiData;
}

type HonorararbeidMisterIkkeHonorar = {
    misterHonorar: false;
    arbeidsforhold?: ArbeidsforholdApiData;
};

type HonorararbeidMisterHonorar = {
    misterHonorar: true;
    arbeidsforhold: ArbeidsforholdApiData;
};

export type HonorararbeidApiData = HonorararbeidMisterIkkeHonorar | HonorararbeidMisterHonorar;

export type FrilanserMedArbeidsforholdApiDataPart = {
    harInntektSomFrilanser: true;
    erFortsattFrilanser: boolean;
    startdato: ISODate;
    sluttdato?: ISODate;
};

export type FrilansApiDataIngenInntekt = {
    type: FrilansApiType.INGEN_INNTEKT_FROM_FRILANSER;
    harInntektSomFrilanser: false;
};

export type FrilansApiDataKunHonorararbeidMisterIkkeHonorar = {
    type: FrilansApiType.KUN_HONORARARBEID_MISTER_IKKE_HONORAR;
    harInntektSomFrilanser: true;
    honorararbeid: HonorararbeidMisterIkkeHonorar;
};

export type FrilansApiDataKunFrilansarbeid = FrilanserMedArbeidsforholdApiDataPart & {
    type: FrilansApiType.KUN_FRILANSARBEID;
    frilansarbeid: FrilansarbeidApiData;
};

export type FrilansApiDataKunHonorararbeid = FrilanserMedArbeidsforholdApiDataPart & {
    type: FrilansApiType.KUN_HONORARARBEID_MISTER_HONORAR;
    honorararbeid: HonorararbeidMisterHonorar;
};

export type FrilansApiDataFrilansarbeidOgHonorararbeid = FrilanserMedArbeidsforholdApiDataPart & {
    type: FrilansApiType.FRILANSARBEID_OG_HONORARARBEID;
    frilansarbeid: FrilansarbeidApiData;
    honorararbeid: HonorararbeidApiData;
};

export type FrilansApiData =
    | FrilansApiDataIngenInntekt
    | FrilansApiDataKunHonorararbeidMisterIkkeHonorar
    | FrilansApiDataKunFrilansarbeid
    | FrilansApiDataKunHonorararbeid
    | FrilansApiDataFrilansarbeidOgHonorararbeid;
