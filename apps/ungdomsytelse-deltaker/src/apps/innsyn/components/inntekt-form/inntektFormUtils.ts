import {
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { Inntekt } from '../../../../api/types';
import { InntektFormFields, InntektFormValues } from './types';

export const inntektFormComponents = getTypedFormComponents<InntektFormFields, InntektFormValues, ValidationError>();

export const getInntektFromFormValues = (values: InntektFormValues, ignoreYesNoQuestions?: boolean): Inntekt => {
    const harArbeidstakerFrilanserInntekt = values[InntektFormFields.harArbeidstakerFrilanserInntekt] === YesOrNo.YES;
    const harSNInntekt = values[InntektFormFields.harSNInntekt] === YesOrNo.YES;
    const harYtelseInntekt = values[InntektFormFields.harYtelseInntekt] === YesOrNo.YES;

    const inntektAnsatt =
        ignoreYesNoQuestions || harArbeidstakerFrilanserInntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.ansattInntekt]) || 0
            : 0;
    const inntektSN =
        ignoreYesNoQuestions || harSNInntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.snInntekt]) || 0
            : 0;
    const inntektYtelse =
        ignoreYesNoQuestions || harYtelseInntekt
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
