import { ISODate } from '@navikt/sif-common-utils';
import { Frilanstype } from '../søknad-form-values/FrilansFormValues';
import { ArbeidsforholdApiData } from './ArbeidsforholdApiData';

export type FrilansApiDataIngenInntekt = {
    harInntektSomFrilanser: false;
};

export type FrilansApiDataKunHonorarMisterIkkeHonorar = {
    type: Frilanstype.HONORAR;
    harInntektSomFrilanser: true;
    misterHonorar: false;
    _misterInntektSomFrilanser: false /** Brukes kun i søknadsdialog */;
};

export type FrilanserMedArbeidsforholdApiDataPart = {
    type: Frilanstype;
    harInntektSomFrilanser: true;
    misterHonorar?: boolean;
    jobberFortsattSomFrilans: boolean;
    startetFørSisteTreHeleMåneder: boolean;
    startdato: ISODate;
    sluttdato?: ISODate;
    arbeidsforhold: ArbeidsforholdApiData;
    _misterInntektSomFrilanser: true /** Brukes kun i søknadsdialog */;
};

export type FrilansApiData =
    | FrilansApiDataIngenInntekt
    | FrilansApiDataKunHonorarMisterIkkeHonorar
    | FrilanserMedArbeidsforholdApiDataPart;
