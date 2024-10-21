import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import * as stepValidations from '../../validation/stepValidations';
import * as stepUtils from '../stepUtils';
import { YesOrNoOrDoNotKnow } from '../../types/YesOrNoOrDoNotKnow';
import { vi } from 'vitest';

vi.mock('./../../validation/stepValidations', () => {
    return {
        welcomingPageIsValid: vi.fn(() => true),
        opplysningerOmBarnetStepIsValid: vi.fn(() => true),
        opplysningerOmTidsromStepIsValid: vi.fn(() => true),
        arbeidssituasjonStepIsValid: vi.fn(() => true),
        medlemskapStepIsValid: vi.fn(() => true),
        legeerklæringStepIsValid: vi.fn(() => true),
    };
});

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => ({}), getEnv: () => '' };
});

const formValues: Partial<SøknadFormValues> = {};

describe('stepUtils', () => {
    describe('opplysningerOmBarnetStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.opplysningerOmBarnetStepAvailable(formValues as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formValues);
            expect(returnValue).toEqual(stepValidations.welcomingPageIsValid({} as any));
        });
    });

    describe('opplysningerOmTidsromStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.opplysningerOmTidsromStepAvailable(formValues as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formValues);
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any),
            );
        });
    });

    describe('arbeidssituasjonStepIsValid', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.arbeidssituasjonStepAvailable(formValues as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.opplysningerOmTidsromStepIsValid).toHaveBeenCalledWith(formValues);
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any) &&
                    stepValidations.opplysningerOmTidsromStepIsValid({} as any),
            );
        });
    });

    describe('medlemskapStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.medlemskapStepAvailable(formValues as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.opplysningerOmTidsromStepIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.arbeidssituasjonStepIsValid).toHaveBeenCalled();
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any) &&
                    stepValidations.opplysningerOmTidsromStepIsValid({} as any) &&
                    stepValidations.arbeidssituasjonStepIsValid(),
            );
        });
    });

    describe('legeerklæringStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.legeerklæringStepAvailable(formValues as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.opplysningerOmTidsromStepIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.arbeidssituasjonStepIsValid).toHaveBeenCalled();
            expect(stepValidations.medlemskapStepIsValid).toHaveBeenCalledWith(formValues);
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any) &&
                    stepValidations.opplysningerOmTidsromStepIsValid({} as any) &&
                    stepValidations.arbeidssituasjonStepIsValid() &&
                    stepValidations.medlemskapStepIsValid({} as any),
            );
        });
    });

    describe('oppsummeringStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.oppsummeringStepAvailable(formValues as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.opplysningerOmTidsromStepIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.arbeidssituasjonStepIsValid).toHaveBeenCalled();
            expect(stepValidations.medlemskapStepIsValid).toHaveBeenCalledWith(formValues);
            expect(stepValidations.legeerklæringStepIsValid).toHaveBeenCalled();
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any) &&
                    stepValidations.opplysningerOmTidsromStepIsValid({} as any) &&
                    stepValidations.arbeidssituasjonStepIsValid() &&
                    stepValidations.medlemskapStepIsValid({} as any) &&
                    stepValidations.legeerklæringStepIsValid(),
            );
        });
    });

    describe('skalBrukerSvarePåBeredskapOgNattevåk', () => {
        it('inkluderer ikke nattevåk/beredskap dersom barnet ikke har vært/skal i tilsyn - 1', () => {
            formValues.omsorgstilbud = undefined;
            const returnValue = stepUtils.skalBrukerSvarePåBeredskapOgNattevåk(formValues as SøknadFormValues);
            expect(returnValue).toBeFalsy();
        });
        it('inkluderer ikke nattevåk/beredskap dersom barnet ikke har vært/skal i tilsyn - 2', () => {
            formValues.omsorgstilbud = {
                erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.NO,
                erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.NO,
            };
            const returnValue = stepUtils.skalBrukerSvarePåBeredskapOgNattevåk(formValues as SøknadFormValues);
            expect(returnValue).toBeFalsy();
        });
        it('inkluderer ikke nattevåk/beredskap dersom barnet ikke har vært/skal i tilsyn - 3', () => {
            formValues.omsorgstilbud = {
                erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.UNANSWERED,
                erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.UNANSWERED,
            };
            const returnValue = stepUtils.skalBrukerSvarePåBeredskapOgNattevåk(formValues as SøknadFormValues);
            expect(returnValue).toBeFalsy();
        });
        it('inkluderer nattevåk/beredskap dersom barn er i omsorgstilbud', () => {
            formValues.omsorgstilbud = {
                erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.YES,
                enkeltdager: {
                    '2020-01-01': { hours: '1', minutes: '0' },
                },
            };
            const returnValue = stepUtils.skalBrukerSvarePåBeredskapOgNattevåk(formValues as SøknadFormValues);
            expect(returnValue).toBeTruthy();
        });
    });
});
