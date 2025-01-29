import { getNumberFromNumberInputValue, YesOrNo } from '@navikt/sif-common-formik-ds';
import { InntektFormFields, InntektFormValues } from './InntektForm';
import { Inntekt } from '../../../../api/types';

export const getInntektFromFormValues = (values: InntektFormValues): Inntekt => {
    const harArbeidstakerFrilanserInntekt = values[InntektFormFields.harArbeidstakerFrilanserInntekt] === YesOrNo.YES;
    const harSNInntekt = values[InntektFormFields.harSNInntekt] === YesOrNo.YES;
    const harYtelseInntekt = values[InntektFormFields.harYtelseInntekt] === YesOrNo.YES;

    const inntektAnsatt = harArbeidstakerFrilanserInntekt
        ? getNumberFromNumberInputValue(values[InntektFormFields.ansattInntekt]) || 0
        : 0;
    const inntektSN = harSNInntekt ? getNumberFromNumberInputValue(values[InntektFormFields.snInntekt]) || 0 : 0;
    const inntektYtelse = harYtelseInntekt
        ? getNumberFromNumberInputValue(values[InntektFormFields.ytelseInntekt]) || 0
        : 0;

    return {
        inntektAnsatt,
        inntektSN,
        inntektYtelse,
        samletInntekt: inntektAnsatt + inntektSN + inntektYtelse,
    };
};

export const erAlleInntektSpørsmålBesvartOgGyldig = (values: InntektFormValues) => {
    const harArbeidstakerFrilanserInntekt = values[InntektFormFields.harArbeidstakerFrilanserInntekt];
    const harSNInntekt = values[InntektFormFields.harSNInntekt];
    const harYtelseInntekt = values[InntektFormFields.harYtelseInntekt];
    return !!harArbeidstakerFrilanserInntekt && !!harSNInntekt && !!harYtelseInntekt;
};
