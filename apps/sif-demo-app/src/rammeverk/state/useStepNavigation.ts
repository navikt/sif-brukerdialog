import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { StepConfig, StepStatusCallbacks } from '../types';
import { getIncludedSteps } from '../utils/stepUtils';

interface UseStepNavigationOptions {
    stepConfig: StepConfig;
    stepOrder: string[];
    stepStatus: StepStatusCallbacks;
    setCurrentStep: (stepId: string) => void;
    basePath?: string;
}

/**
 * Beregner neste/forrige steg basert på fresh state.
 * Viktig for navigasjon etter state-oppdatering i samme event handler.
 */
const getPreviousNextStep = (stepOrder: string[], stepStatus: StepStatusCallbacks, currentStepId: string | null) => {
    const includedSteps = getIncludedSteps(stepOrder, stepStatus);
    const includedStepIds = includedSteps.map((s) => s.stepId);
    const currentIndex = currentStepId ? includedStepIds.indexOf(currentStepId) : -1;

    return {
        previousStepId: currentIndex > 0 ? includedStepIds[currentIndex - 1] : null,
        nextStepId: currentIndex < includedStepIds.length - 1 ? includedStepIds[currentIndex + 1] : null,
    };
};

export const useStepNavigation = ({
    stepConfig,
    stepOrder,
    stepStatus,
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
            const { nextStepId } = getPreviousNextStep(stepOrder, stepStatus, fromStepId);
            if (nextStepId) {
                navigateToStep(nextStepId);
            }
        },
        [stepOrder, stepStatus, navigateToStep],
    );

    const navigateToPreviousStep = useCallback(
        (fromStepId: string) => {
            const { previousStepId } = getPreviousNextStep(stepOrder, stepStatus, fromStepId);
            if (previousStepId) {
                navigateToStep(previousStepId);
            }
        },
        [stepOrder, stepStatus, navigateToStep],
    );

    const canGoNext = useCallback(
        (fromStepId: string) => {
            const { nextStepId } = getPreviousNextStep(stepOrder, stepStatus, fromStepId);
            return nextStepId !== null;
        },
        [stepOrder, stepStatus],
    );

    const canGoPrevious = useCallback(
        (fromStepId: string) => {
            const { previousStepId } = getPreviousNextStep(stepOrder, stepStatus, fromStepId);
            return previousStepId !== null;
        },
        [stepOrder, stepStatus],
    );

    return {
        navigateToStep,
        navigateToNextStep,
        navigateToPreviousStep,
        canGoNext,
        canGoPrevious,
    };
};
