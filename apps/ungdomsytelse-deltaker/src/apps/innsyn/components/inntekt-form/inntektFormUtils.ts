import {
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { Inntekt } from '@navikt/ung-common';
import { InntektFormFields, InntektFormValues } from './types';

export const inntektFormComponents = getTypedFormComponents<InntektFormFields, InntektFormValues, ValidationError>();

export const getInntektFromFormValues = (values: InntektFormValues, ignoreYesNoQuestions?: boolean): Inntekt => {
    const harArbeidstakerOgFrilansInntekt = values[InntektFormFields.harArbeidstakerOgFrilansInntekt] === YesOrNo.YES;
    const harNæringsinntekt = values[InntektFormFields.harNæringsinntekt] === YesOrNo.YES;
    const harInntektFraYtelse = values[InntektFormFields.harInntektFraYtelse] === YesOrNo.YES;

    const arbeidstakerOgFrilansInntekt =
        ignoreYesNoQuestions || harArbeidstakerOgFrilansInntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.ansattInntekt]) || 0
            : 0;
    const næringsinntekt =
        ignoreYesNoQuestions || harNæringsinntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.snInntekt]) || 0
            : 0;
    const inntektFraYtelse =
        ignoreYesNoQuestions || harInntektFraYtelse
            ? getNumberFromNumberInputValue(values[InntektFormFields.ytelseInntekt]) || 0
            : 0;

    return {
        arbeidstakerOgFrilansInntekt,
        næringsinntekt,
        inntektFraYtelse,
        summertInntekt: arbeidstakerOgFrilansInntekt + næringsinntekt + inntektFraYtelse,
    };
};

export const erAlleInntektSpørsmålBesvartOgGyldig = (values: InntektFormValues) => {
    const harArbeidstakerOgFrilansInntekt = values[InntektFormFields.harArbeidstakerOgFrilansInntekt];
    const harNæringsinntekt = values[InntektFormFields.harNæringsinntekt];
    const harInntektFraYtelse = values[InntektFormFields.harInntektFraYtelse];
    return !!harArbeidstakerOgFrilansInntekt && !!harNæringsinntekt && !!harInntektFraYtelse;
};
