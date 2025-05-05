import { YesOrNo } from '@navikt/sif-common-formik-ds';

export enum InntektFormFields {
    harArbeidstakerOgFrilansInntekt = 'harArbeidstakerOgFrilansInntekt',
    ansattInntekt = 'ansattInntekt',
    bekrefterInntekt = 'bekrefterInntekt',
}

export interface InntektFormValues {
    [InntektFormFields.harArbeidstakerOgFrilansInntekt]?: YesOrNo;
    [InntektFormFields.ansattInntekt]?: string;
    [InntektFormFields.bekrefterInntekt]?: boolean;
}
