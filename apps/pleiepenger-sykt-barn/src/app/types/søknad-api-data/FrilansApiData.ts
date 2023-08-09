import { ISODate } from '@navikt/sif-common-utils/lib';
import { Frilanstype } from '../FrilansFormData';
import { ArbeidsforholdApiData } from './ArbeidsforholdApiData';

export type FrilansApiDataIngenInntekt = {
    harInntektSomFrilanser: false;
};

export type FrilansApiDataKunHonorarMisterIkkeHonorar = {
    type: Frilanstype.HONORAR;
    harInntektSomFrilanser: true;
    misterInntektSomFrilanser: false;
    misterHonorar: false;
};

export type FrilanserMedArbeidsforholdApiDataPart = {
    type: Frilanstype;
    harInntektSomFrilanser: true;
    misterInntektSomFrilanser: true;
    misterHonorar?: boolean;
    erFortsattFrilanser: boolean;
    startdato: ISODate;
    sluttdato?: ISODate;
    arbeidsforhold: ArbeidsforholdApiData;
};

export type FrilansApiData =
    | FrilansApiDataIngenInntekt
    | FrilansApiDataKunHonorarMisterIkkeHonorar
    | FrilanserMedArbeidsforholdApiDataPart;
