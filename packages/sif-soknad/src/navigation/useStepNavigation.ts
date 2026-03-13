import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { IncludedStep, StepConfig } from '../types';
import { getPreviousNextStep } from '../utils';

interface UseStepNavigationOptions {
    stepConfig: StepConfig;
    getSøknadSteps: () => IncludedStep[];
    setCurrentStep: (stepId: string) => void;
    basePath?: string;
}

/**
 * Hook for å håndtere navigasjon mellom steg i en søknadsprosess. Beregner neste og forrige steg basert på inkluderte steg og oppdatert state.
 */
export const useStepNavigation = ({
    stepConfig,
    getSøknadSteps,
    setCurrentStep,
    basePath = '/soknad',
}: UseStepNavigationOptions) => {
    const navigate = useNavigate();

    const navigateToStart = useCallback(() => {
        navigate(basePath);
    }, [navigate, basePath]);

    const navigateToStep = useCallback(
        (stepId: string) => {
            setCurrentStep(stepId);
            const route = stepConfig[stepId].route;
            navigate(`${basePath}/${route}`);
        },
        [setCurrentStep, navigate, basePath, stepConfig],
    );

    const navigateToNextStep = useCallback(
        (fromStepId: string) => {
            const { nextStepId } = getPreviousNextStep(getSøknadSteps(), fromStepId);
            if (nextStepId) {
                navigateToStep(nextStepId);
            }
        },
        [getSøknadSteps, navigateToStep],
    );

    const navigateToPreviousStep = useCallback(
        (fromStepId: string) => {
            const { previousStepId } = getPreviousNextStep(getSøknadSteps(), fromStepId);
            if (previousStepId) {
                navigateToStep(previousStepId);
            }
        },
        [getSøknadSteps, navigateToStep],
    );

    const canGoNext = useCallback(
        (fromStepId: string) => {
            const { nextStepId } = getPreviousNextStep(getSøknadSteps(), fromStepId);
            return nextStepId !== null;
        },
        [getSøknadSteps],
    );

    const canGoPrevious = useCallback(
        (fromStepId: string) => {
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
