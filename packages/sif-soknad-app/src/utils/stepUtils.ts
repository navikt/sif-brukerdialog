import { IncludedStep, StepDefinition } from '../types';

export const getIncludedSteps = (
    stepOrder: string[],
    config: Record<string, StepDefinition>,
    søknadsdata: Record<string, unknown>,
): IncludedStep[] => {
    return stepOrder.flatMap((stepId) => {
        const step = config[stepId];
        if (!step) {
            throw new Error(`getIncludedSteps: stepOrder inneholder ukjent stepId '${stepId}'`);
        }

        const isIncluded = step.isIncluded?.(søknadsdata) ?? true;
        if (!isIncluded) {
            return [];
        }

        const completed = step.isCompleted?.(søknadsdata) ?? false;
        return [{ stepId, stepRoute: step.route, completed }];
    });
};

export const getPreviousNextStep = (
    includedSteps: IncludedStep[],
    currentStepId: string | null,
): { previousStepId: string | null; nextStepId: string | null } => {
    const includedStepIds = includedSteps.map((s) => s.stepId);
    const currentIndex = currentStepId ? includedStepIds.indexOf(currentStepId) : -1;

    if (currentIndex === -1) {
        return { previousStepId: null, nextStepId: null };
    }

    return {
        previousStepId: currentIndex > 0 ? includedStepIds[currentIndex - 1] : null,
        nextStepId: currentIndex < includedStepIds.length - 1 ? includedStepIds[currentIndex + 1] : null,
    };
};

/**
 * Finner første uferdige steg ETTER fromStepId i inkluderte steg.
 * Fallback: neste steg i rekkefølge, eller undefined hvis fromStepId er siste steg.
 */
export const findNextStepId = (includedSteps: IncludedStep[], fromStepId: string): string | undefined => {
    const fromIndex = includedSteps.findIndex((s) => s.stepId === fromStepId);
    if (fromIndex === -1) {
        return includedSteps.find((s) => !s.completed)?.stepId;
    }

    const remaining = includedSteps.slice(fromIndex + 1);
    return remaining.find((s) => !s.completed)?.stepId ?? remaining[0]?.stepId;
};
