import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { Virksomhet } from '@navikt/sif-common-forms-ds/lib';
import { ArbeidsforholdSelvstendigFormValues } from './_ArbeidsforholdFormValues';

export enum SelvstendigFormField {
    harHattInntektSomSN = 'selvstendig.harHattInntektSomSN',
    harFlereVirksomheter = 'selvstendig.harFlereVirksomheter',
    virksomhet = 'selvstendig.virksomhet',
    arbeidsforhold = 'selvstendig.arbeidsforhold',
}

export interface SelvstendigFormData {
    harHattInntektSomSN?: YesOrNo;
    harFlereVirksomheter?: YesOrNo;
    virksomhet?: Virksomhet;
    arbeidsforhold?: ArbeidsforholdSelvstendigFormValues;
}
