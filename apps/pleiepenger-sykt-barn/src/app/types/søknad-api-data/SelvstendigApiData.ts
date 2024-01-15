import { VirksomhetApiData } from '@navikt/sif-common-forms-ds/src';
import { ArbeidsforholdApiData } from './ArbeidsforholdApiData';

export interface SelvstendigApiDataIngenInntekt {
    harInntektSomSelvstendig: false;
}
export interface SelvstendigApiDataHarInntekt {
    harInntektSomSelvstendig: true;
    virksomhet: VirksomhetApiData;
    arbeidsforhold: ArbeidsforholdApiData;
}

export type SelvstendigApiData = SelvstendigApiDataHarInntekt | SelvstendigApiDataIngenInntekt;
