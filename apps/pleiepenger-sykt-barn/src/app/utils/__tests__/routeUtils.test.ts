import { vi } from 'vitest';
import RouteConfig from '../../config/routeConfig';
import { StepID } from '../../types/StepID';
import { SøknadFormField } from '../../types/søknad-form-values/SøknadFormValues';
import { isAvailable } from '../routeUtils';
import * as stepUtils from '../stepUtils';

vi.mock('../featureToggleUtils', () => {
    return {
        isFeatureEnabled: () => false,
        Feature: {},
    };
});

vi.mock('./../stepUtils', () => {
    return {
        opplysningerOmBarnetStepAvailable: vi.fn(() => 'barn step available'),
        opplysningerOmTidsromStepAvailable: vi.fn(() => 'tidsrom step available'),
        arbeidssituasjonStepAvailable: vi.fn(() => 'arbeidsforhold step available'),
        legeerklæringStepAvailable: vi.fn(() => 'legeerklæring step available'),
        medlemskapStepAvailable: vi.fn(() => 'medlemskap step available'),
        oppsummeringStepAvailable: vi.fn(() => 'oppsummering step available'),
        skalBrukerSvarePåBeredskapOgNattevåk: vi.fn(() => false),
        skalBrukerSvarePåarbeidIPeriode: vi.fn(() => true),
    };
});

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getSifInnsynBrowserEnv: () => {}, getCommonEnv: () => {}, getEnv: () => '' };
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
                true,
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
                false,
            );
            expect(result).toBe(false);
        });
    });
});
