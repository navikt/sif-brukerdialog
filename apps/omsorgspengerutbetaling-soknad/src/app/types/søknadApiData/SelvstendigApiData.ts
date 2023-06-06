import { VirksomhetApiData } from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/types';

export interface SelvstendigApiDataIngenInntekt {
    harInntektSomSelvstendig: false;
}
export interface SelvstendigApiDataHarInntekt {
    harInntektSomSelvstendig: true;
    virksomhet: VirksomhetApiData;

    // ??? Har flere virksomhet
}

export type SelvstendigApiData = SelvstendigApiDataHarInntekt | SelvstendigApiDataIngenInntekt;
