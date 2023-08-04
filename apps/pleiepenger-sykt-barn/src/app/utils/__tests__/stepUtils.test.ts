import { SøknadFormValues } from '../../types/_SøknadFormValues';
import * as stepValidations from '../../validation/stepValidations';
import * as stepUtils from '../stepUtils';
import { YesOrNoOrDoNotKnow } from '../../types/_YesOrNoOrDoNotKnow';

jest.mock('./../../validation/stepValidations', () => {
    return {
        welcomingPageIsValid: jest.fn(() => true),
        opplysningerOmBarnetStepIsValid: jest.fn(() => true),
        opplysningerOmTidsromStepIsValid: jest.fn(() => true),
        arbeidssituasjonStepIsValid: jest.fn(() => true),
        medlemskapStepIsValid: jest.fn(() => true),
        legeerklæringStepIsValid: jest.fn(() => true),
    };
});

const formData: Partial<SøknadFormValues> = {};

describe('stepUtils', () => {
    describe('opplysningerOmBarnetStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.opplysningerOmBarnetStepAvailable(formData as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formData);
            expect(returnValue).toEqual(stepValidations.welcomingPageIsValid({} as any));
        });
    });

    describe('opplysningerOmTidsromStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.opplysningerOmTidsromStepAvailable(formData as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formData);
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any)
            );
        });
    });

    describe('arbeidssituasjonStepIsValid', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.arbeidssituasjonStepAvailable(formData as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.opplysningerOmTidsromStepIsValid).toHaveBeenCalledWith(formData);
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any) &&
                    stepValidations.opplysningerOmTidsromStepIsValid({} as any)
            );
        });
    });

    describe('medlemskapStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.medlemskapStepAvailable(formData as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.opplysningerOmTidsromStepIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.arbeidssituasjonStepIsValid).toHaveBeenCalled();
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any) &&
                    stepValidations.opplysningerOmTidsromStepIsValid({} as any) &&
                    stepValidations.arbeidssituasjonStepIsValid()
            );
        });
    });

    describe('legeerklæringStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.legeerklæringStepAvailable(formData as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.opplysningerOmTidsromStepIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.arbeidssituasjonStepIsValid).toHaveBeenCalled();
            expect(stepValidations.medlemskapStepIsValid).toHaveBeenCalledWith(formData);
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any) &&
                    stepValidations.opplysningerOmTidsromStepIsValid({} as any) &&
                    stepValidations.arbeidssituasjonStepIsValid() &&
                    stepValidations.medlemskapStepIsValid({} as any)
            );
        });
    });

    describe('oppsummeringStepAvailable', () => {
        it('should call relevant stepValidator-functions to determine whether the step should be available', () => {
            const returnValue = stepUtils.oppsummeringStepAvailable(formData as SøknadFormValues);
            expect(stepValidations.welcomingPageIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.opplysningerOmBarnetStepIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.opplysningerOmTidsromStepIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.arbeidssituasjonStepIsValid).toHaveBeenCalled();
            expect(stepValidations.medlemskapStepIsValid).toHaveBeenCalledWith(formData);
            expect(stepValidations.legeerklæringStepIsValid).toHaveBeenCalled();
            expect(returnValue).toEqual(
                stepValidations.welcomingPageIsValid({} as any) &&
                    stepValidations.opplysningerOmBarnetStepIsValid({} as any) &&
                    stepValidations.opplysningerOmTidsromStepIsValid({} as any) &&
                    stepValidations.arbeidssituasjonStepIsValid() &&
                    stepValidations.medlemskapStepIsValid({} as any) &&
                    stepValidations.legeerklæringStepIsValid()
            );
        });
    });

    describe('skalBrukerSvarePåBeredskapOgNattevåk', () => {
        it('inkluderer ikke nattevåk/beredskap dersom barnet ikke har vært/skal i tilsyn - 1', () => {
            formData.omsorgstilbud = undefined;
            const returnValue = stepUtils.skalBrukerSvarePåBeredskapOgNattevåk(formData as SøknadFormValues);
            expect(returnValue).toBeFalsy();
        });
        it('inkluderer ikke nattevåk/beredskap dersom barnet ikke har vært/skal i tilsyn - 2', () => {
            formData.omsorgstilbud = {
                erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.NO,
                erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.NO,
            };
            const returnValue = stepUtils.skalBrukerSvarePåBeredskapOgNattevåk(formData as SøknadFormValues);
            expect(returnValue).toBeFalsy();
        });
        it('inkluderer ikke nattevåk/beredskap dersom barnet ikke har vært/skal i tilsyn - 3', () => {
            formData.omsorgstilbud = {
                erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.UNANSWERED,
                erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.UNANSWERED,
            };
            const returnValue = stepUtils.skalBrukerSvarePåBeredskapOgNattevåk(formData as SøknadFormValues);
            expect(returnValue).toBeFalsy();
        });
        it('inkluderer nattevåk/beredskap dersom barn er i omsorgstilbud', () => {
            formData.omsorgstilbud = {
                erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.YES,
                enkeltdager: {
                    '2020-01-01': { hours: '1', minutes: '0' },
                },
            };
            const returnValue = stepUtils.skalBrukerSvarePåBeredskapOgNattevåk(formData as SøknadFormValues);
            expect(returnValue).toBeTruthy();
        });
    });
});
