import { ProgressStep } from '@navikt/sif-common-ui';

import { IncludedStep, StepConfig } from '../types';

export const getPreviousNextStep = (includedSteps: IncludedStep[], currentStepId: string | null) => {
    const includedStepIds = includedSteps.map((s) => s.stepId);
    const currentIndex = currentStepId ? includedStepIds.indexOf(currentStepId) : -1;

    return {
        previousStepId: currentIndex > 0 ? includedStepIds[currentIndex - 1] : null,
        nextStepId: currentIndex < includedStepIds.length - 1 ? includedStepIds[currentIndex + 1] : null,
    };
};

export const getIncludedSteps = <TSøknadsdata>(
    stepOrder: string[],
    stepConfig: StepConfig<TSøknadsdata>,
    søknadsdata: TSøknadsdata,
): IncludedStep[] => {
    const includedIds = stepOrder.filter((id) => stepConfig[id]?.isIncluded?.(søknadsdata) ?? true);

    return includedIds.map((stepId) => {
        const step = stepConfig[stepId];
        const completed = step?.isCompleted?.(søknadsdata) ?? false;
        return { stepId, stepRoute: step.route, completed };
    });
};

/**
 * Mapper inkluderte steg til ProgressStep-formatet for bruk i ProgressStepper-komponenten.
 */
export const getProgressSteps = (includedSteps: IncludedStep[], stepTitles: Record<string, string>): ProgressStep[] => {
    return includedSteps.map((s, index) => ({
        id: s.stepId,
        index,
        label: stepTitles[s.stepId],
        completed: s.completed,
    }));
};
