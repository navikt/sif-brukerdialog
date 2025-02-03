import { YesOrNo } from '@navikt/sif-common-formik-ds';

export enum InntektFormFields {
    harArbeidstakerOgFrilansInntekt = 'harArbeidstakerOgFrilansInntekt',
    harNæringsinntekt = 'harNæringsinntekt',
    harInntektFraYtelse = 'harInntektFraYtelse',
    ansattInntekt = 'ansattInntekt',
    snInntekt = 'snInntekt',
    ytelseInntekt = 'ytelseInntekt',
    bekrefterInntekt = 'bekrefterInntekt',
}

export interface InntektFormValues {
    [InntektFormFields.harArbeidstakerOgFrilansInntekt]?: YesOrNo;
    [InntektFormFields.harNæringsinntekt]?: YesOrNo;
    [InntektFormFields.harInntektFraYtelse]?: YesOrNo;
    [InntektFormFields.ansattInntekt]?: string;
    [InntektFormFields.snInntekt]?: string;
    [InntektFormFields.ytelseInntekt]?: string;
    [InntektFormFields.bekrefterInntekt]?: boolean;
}
