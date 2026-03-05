import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { IncludedStep, StepConfig } from '../types';

interface UseStepNavigationOptions {
    stepConfig: StepConfig;
    getIncludedSteps: () => IncludedStep[];
    setCurrentStep: (stepId: string) => void;
    basePath?: string;
}

/**
 * Beregner neste/forrige steg basert på fresh state.
 * Viktig for navigasjon etter state-oppdatering i samme event handler.
 */
const getPreviousNextStep = (includedSteps: IncludedStep[], currentStepId: string | null) => {
    const includedStepIds = includedSteps.map((s) => s.stepId);
    const currentIndex = currentStepId ? includedStepIds.indexOf(currentStepId) : -1;

    return {
        previousStepId: currentIndex > 0 ? includedStepIds[currentIndex - 1] : null,
        nextStepId: currentIndex < includedStepIds.length - 1 ? includedStepIds[currentIndex + 1] : null,
    };
};

export const useStepNavigation = ({
    stepConfig,
    getIncludedSteps,
    setCurrentStep,
    basePath = '/soknad',
}: UseStepNavigationOptions) => {
    const navigate = useNavigate();

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
            const { nextStepId } = getPreviousNextStep(getIncludedSteps(), fromStepId);
            if (nextStepId) {
                navigateToStep(nextStepId);
            }
        },
        [getIncludedSteps, navigateToStep],
    );

    const navigateToPreviousStep = useCallback(
        (fromStepId: string) => {
            const { previousStepId } = getPreviousNextStep(getIncludedSteps(), fromStepId);
            if (previousStepId) {
                navigateToStep(previousStepId);
            }
        },
        [getIncludedSteps, navigateToStep],
    );

    const canGoNext = useCallback(
        (fromStepId: string) => {
            const { nextStepId } = getPreviousNextStep(getIncludedSteps(), fromStepId);
            return nextStepId !== null;
        },
        [getIncludedSteps],
    );

    const canGoPrevious = useCallback(
        (fromStepId: string) => {
            const { previousStepId } = getPreviousNextStep(getIncludedSteps(), fromStepId);
            return previousStepId !== null;
        },
        [getIncludedSteps],
    );

    return {
        navigateToStep,
        navigateToNextStep,
        navigateToPreviousStep,
        canGoNext,
        canGoPrevious,
    };
};
