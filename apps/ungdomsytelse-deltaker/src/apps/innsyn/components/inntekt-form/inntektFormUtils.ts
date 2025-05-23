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

    const arbeidOgFrilansInntekter =
        ignoreYesNoQuestions || harArbeidstakerOgFrilansInntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.ansattInntekt]) || 0
            : 0;

    return {
        arbeidOgFrilansInntekter,
    };
};

export const erAlleInntektSpørsmålBesvartOgGyldig = (values: InntektFormValues) => {
    const harArbeidstakerOgFrilansInntekt = values[InntektFormFields.harArbeidstakerOgFrilansInntekt];
    return !!harArbeidstakerOgFrilansInntekt;
};
