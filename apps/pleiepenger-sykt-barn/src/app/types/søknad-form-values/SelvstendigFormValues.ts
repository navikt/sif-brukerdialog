import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { Virksomhet } from '@navikt/sif-common-forms-ds/src';
import { ArbeidsforholdSelvstendigFormValues } from './ArbeidsforholdFormValues';

export enum SelvstendigFormField {
    harHattInntektSomSN = 'selvstendig.harHattInntektSomSN',
    harFlereVirksomheter = 'selvstendig.harFlereVirksomheter',
    virksomhet = 'selvstendig.virksomhet',
    arbeidsforhold = 'selvstendig.arbeidsforhold',
}

export interface SelvstendigFormValues {
    harHattInntektSomSN?: YesOrNo;
    harFlereVirksomheter?: YesOrNo;
    virksomhet?: Virksomhet;
    arbeidsforhold?: ArbeidsforholdSelvstendigFormValues;
}
