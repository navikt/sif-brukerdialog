import { VirksomhetApiData } from '@navikt/sif-common-forms-ds/lib';
import { ArbeidsforholdApiData } from './_ArbeidsforholdApiData';

export interface SelvstendigApiDataIngenInntekt {
    harInntektSomSelvstendig: false;
}
export interface SelvstendigApiDataHarInntekt {
    harInntektSomSelvstendig: true;
    virksomhet: VirksomhetApiData;
    arbeidsforhold: ArbeidsforholdApiData;
}

export type SelvstendigApiData = SelvstendigApiDataHarInntekt | SelvstendigApiDataIngenInntekt;
