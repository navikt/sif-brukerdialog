import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { IncludedStep, StepConfig } from '../types';
import { getPreviousNextStep } from '../utils';
import { buildStepPath } from './routeUtils';

interface UseStepNavigationOptions<TStepId extends string, TSøknadsdata> {
    stepConfig: StepConfig<TStepId, TSøknadsdata>;
    getSøknadSteps: () => Array<IncludedStep<TStepId>>;
    setCurrentStep: (stepId: TStepId) => void;
    basePath?: string;
}

/**
 * Hook for å håndtere navigasjon mellom steg i en søknadsprosess. Beregner neste og forrige steg basert på inkluderte steg og oppdatert state.
 */
export const useStepNavigation = <TStepId extends string, TSøknadsdata>({
    stepConfig,
    getSøknadSteps,
    setCurrentStep,
    basePath = '/soknad',
}: UseStepNavigationOptions<TStepId, TSøknadsdata>) => {
    const navigate = useNavigate();

    const navigateToStart = useCallback(() => {
        navigate(basePath);
    }, [navigate, basePath]);

    const navigateToStep = useCallback(
        (stepId: TStepId) => {
            setCurrentStep(stepId);
            const route = stepConfig[stepId].route;
            navigate(buildStepPath(basePath, route));
        },
        [setCurrentStep, navigate, basePath, stepConfig],
    );

    const navigateToNextStep = useCallback(
        (fromStepId: TStepId) => {
            const { nextStepId } = getPreviousNextStep(getSøknadSteps(), fromStepId);
            if (nextStepId) {
                navigateToStep(nextStepId);
            }
        },
        [getSøknadSteps, navigateToStep],
    );

    const navigateToPreviousStep = useCallback(
        (fromStepId: TStepId) => {
            const { previousStepId } = getPreviousNextStep(getSøknadSteps(), fromStepId);
            if (previousStepId) {
                navigateToStep(previousStepId);
            }
        },
        [getSøknadSteps, navigateToStep],
    );

    const canGoNext = useCallback(
        (fromStepId: TStepId) => {
            const { nextStepId } = getPreviousNextStep(getSøknadSteps(), fromStepId);
            return nextStepId !== null;
        },
        [getSøknadSteps],
    );

    const canGoPrevious = useCallback(
        (fromStepId: TStepId) => {
            const { previousStepId } = getPreviousNextStep(getSøknadSteps(), fromStepId);
            return previousStepId !== null;
        },
        [getSøknadSteps],
    );

    return {
        navigateToStep,
        navigateToNextStep,
        navigateToPreviousStep,
        canGoNext,
        navigateToStart,
        canGoPrevious,
    };
};
