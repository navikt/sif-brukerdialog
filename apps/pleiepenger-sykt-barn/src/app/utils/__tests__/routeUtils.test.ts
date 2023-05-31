import RouteConfig from '../../config/routeConfig';
import { StepID } from '../../søknad/søknadStepsConfig';
import { SøknadFormField } from '../../types/SøknadFormValues';
import { isAvailable } from '../routeUtils';
import * as stepUtils from '../stepUtils';

jest.mock('../featureToggleUtils', () => {
    return {
        isFeatureEnabled: () => false,
        Feature: {},
    };
});

jest.mock('./../stepUtils', () => {
    return {
        opplysningerOmBarnetStepAvailable: jest.fn(() => 'barn step available'),
        opplysningerOmTidsromStepAvailable: jest.fn(() => 'tidsrom step available'),
        arbeidssituasjonStepAvailable: jest.fn(() => 'arbeidsforhold step available'),
        legeerklæringStepAvailable: jest.fn(() => 'legeerklæring step available'),
        medlemskapStepAvailable: jest.fn(() => 'medlemskap step available'),
        oppsummeringStepAvailable: jest.fn(() => 'oppsummering step available'),
        skalBrukerSvarePåBeredskapOgNattevåk: jest.fn(() => false),
        skalBrukerSvarePåarbeidIPeriode: jest.fn(() => true),
    };
});

const formValues = {} as any;

describe('routeUtils', () => {
    describe('isAvailable', () => {
        it('should return result from calling opplysningerOmBarnetStepAvailable if route=StepID.OPPLYSNINGER_OM_BARNET', () => {
            const result = isAvailable(StepID.OPPLYSNINGER_OM_BARNET, formValues);
            expect(stepUtils.opplysningerOmBarnetStepAvailable).toHaveBeenCalledWith(formValues);
            expect(result).toEqual(stepUtils.opplysningerOmBarnetStepAvailable(formValues));
        });

        it('should return result from calling opplysningerOmTidsromStepAvailable if route=StepID.TIDSROM', () => {
            const result = isAvailable(StepID.TIDSROM, formValues);
            expect(stepUtils.opplysningerOmBarnetStepAvailable).toHaveBeenCalledWith(formValues);
            expect(result).toEqual(stepUtils.opplysningerOmTidsromStepAvailable(formValues));
        });

        it('should return result from calling arbeidssituasjonStepAvailable if route=StepID.ARBEIDSFORHOLD', () => {
            const result = isAvailable(StepID.ARBEIDSSITUASJON, formValues);
            expect(stepUtils.arbeidssituasjonStepAvailable).toHaveBeenCalledWith(formValues);
            expect(result).toEqual(stepUtils.arbeidssituasjonStepAvailable(formValues));
        });

        it('should return result from calling legeerklæringStepAvailable if route=StepID.LEGEERKLÆRING', () => {
            const result = isAvailable(StepID.LEGEERKLÆRING, formValues);
            expect(stepUtils.legeerklæringStepAvailable).toHaveBeenCalledWith(formValues);
            expect(result).toEqual(stepUtils.legeerklæringStepAvailable(formValues));
        });

        it('should return result from calling medlemskapStepAvailable if route=StepID.MEDLEMSKAP', () => {
            const result = isAvailable(StepID.MEDLEMSKAP, formValues);
            expect(stepUtils.medlemskapStepAvailable).toHaveBeenCalledWith(formValues);
            expect(result).toEqual(stepUtils.medlemskapStepAvailable(formValues));
        });

        it('should return result from calling oppsummeringStepAvailable if route=StepID.SUMMARY', () => {
            const result = isAvailable(StepID.SUMMARY, formValues);
            expect(stepUtils.oppsummeringStepAvailable).toHaveBeenCalledWith(formValues);
            expect(result).toEqual(stepUtils.oppsummeringStepAvailable(formValues));
        });

        it('should return true if route=RouteConfig.SØKNAD_SENDT_ROUTE and harBekreftetOpplysninger is true', () => {
            const result = isAvailable(
                RouteConfig.SØKNAD_SENDT_ROUTE,
                {
                    ...formValues,
                    [SøknadFormField.harBekreftetOpplysninger]: true,
                },
                true
            );
            expect(result).toBe(true);
        });

        it('should return false if route=RouteConfig.SØKNAD_SENDT_ROUTE and harBekreftetOpplysninger is false', () => {
            const result = isAvailable(
                RouteConfig.SØKNAD_SENDT_ROUTE,
                {
                    ...formValues,
                    [SøknadFormField.harBekreftetOpplysninger]: false,
                },
                false
            );
            expect(result).toBe(false);
        });
    });
});
