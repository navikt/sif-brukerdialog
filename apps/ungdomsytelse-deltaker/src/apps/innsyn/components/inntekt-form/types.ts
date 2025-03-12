import { YesOrNo } from '@navikt/sif-common-formik-ds';

export enum InntektFormFields {
    harArbeidstakerOgFrilansInntekt = 'harArbeidstakerOgFrilansInntekt',
    harInntektFraYtelse = 'harInntektFraYtelse',
    ansattInntekt = 'ansattInntekt',
    ytelseInntekt = 'ytelseInntekt',
    bekrefterInntekt = 'bekrefterInntekt',
}

export interface InntektFormValues {
    [InntektFormFields.harArbeidstakerOgFrilansInntekt]?: YesOrNo;
    [InntektFormFields.harInntektFraYtelse]?: YesOrNo;
    [InntektFormFields.ansattInntekt]?: string;
    [InntektFormFields.ytelseInntekt]?: string;
    [InntektFormFields.bekrefterInntekt]?: boolean;
}
