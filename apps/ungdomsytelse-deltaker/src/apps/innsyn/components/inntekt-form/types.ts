import { YesOrNo } from '@navikt/sif-common-formik-ds';

export enum InntektFormFields {
    harArbeidstakerFrilanserInntekt = 'harArbeidstakerFrilanserInntekt',
    harSNInntekt = 'harSNInntekt',
    harYtelseInntekt = 'harYtelseInntekt',
    ansattInntekt = 'ansattInntekt',
    snInntekt = 'snInntekt',
    ytelseInntekt = 'ytelseInntekt',
    bekrefterInntekt = 'bekrefterInntekt',
}

export interface InntektFormValues {
    [InntektFormFields.harArbeidstakerFrilanserInntekt]?: YesOrNo;
    [InntektFormFields.harSNInntekt]?: YesOrNo;
    [InntektFormFields.harYtelseInntekt]?: YesOrNo;
    [InntektFormFields.ansattInntekt]?: string;
    [InntektFormFields.snInntekt]?: string;
    [InntektFormFields.ytelseInntekt]?: string;
    [InntektFormFields.bekrefterInntekt]?: boolean;
}
