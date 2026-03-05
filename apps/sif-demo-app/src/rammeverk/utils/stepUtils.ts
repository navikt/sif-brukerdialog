import { IncludedStep, StepStatusCallbacks } from '../types';

/**
 * Returnerer liste over aktive steg med tilgjengelighet og fullført-status.
 * Lineær flyt: et steg er tilgjengelig hvis alle foregående er fullført.
 */
export const getIncludedSteps = (stepOrder: string[], callbacks: StepStatusCallbacks): IncludedStep[] => {
    const includedSteps = stepOrder.filter((id) => {
        return callbacks.isStepIncluded?.(id) ?? true;
    });

    return includedSteps.map((stepId, index) => {
        const isCompleted = callbacks.isStepCompleted(stepId);
        const isAvailable = index === 0 || includedSteps.slice(0, index).every((id) => callbacks.isStepCompleted(id));

        return { stepId, isAvailable, isCompleted };
    });
};
