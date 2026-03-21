import { ProgressStep } from '@navikt/sif-common-ui';

import { IncludedStep, StepConfig } from '../types';

export const getPreviousNextStep = <TStepId extends string>(
    includedSteps: Array<IncludedStep<TStepId>>,
    currentStepId: TStepId | null,
) => {
    const includedStepIds = includedSteps.map((s) => s.stepId);
    const currentIndex = currentStepId ? includedStepIds.indexOf(currentStepId) : -1;

    if (currentIndex === -1) {
        return {
            previousStepId: null,
            nextStepId: null,
        };
    }

    return {
        previousStepId: currentIndex > 0 ? includedStepIds[currentIndex - 1] : null,
        nextStepId: currentIndex < includedStepIds.length - 1 ? includedStepIds[currentIndex + 1] : null,
    };
};

export const getIncludedSteps = <TStepId extends string, TSøknadsdata>(
    stepOrder: TStepId[],
    stepConfig: StepConfig<TStepId, TSøknadsdata>,
    søknadsdata: TSøknadsdata,
): Array<IncludedStep<TStepId>> => {
    return stepOrder.flatMap((stepId) => {
        const step = stepConfig[stepId];
        if (!step) {
            throw new Error(`getIncludedSteps: stepOrder inneholder ukjent stepId '${stepId}'`);
        }

        const isIncluded = step.isIncluded?.(søknadsdata) ?? true;
        if (!isIncluded) {
            return [];
        }

        const completed = step.isCompleted?.(søknadsdata) ?? false;
        return { stepId, stepRoute: step.route, completed };
    });
};

/**
 * Mapper inkluderte steg til ProgressStep-formatet for bruk i ProgressStepper-komponenten.
 */
export const getProgressSteps = <TStepId extends string>(
    includedSteps: Array<IncludedStep<TStepId>>,
    stepTitles: Record<TStepId, string>,
): ProgressStep[] => {
    return includedSteps.map((s, index) => ({
        id: s.stepId,
        index,
        label: stepTitles[s.stepId],
        completed: s.completed,
    }));
};
