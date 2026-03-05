import { IncludedStep, StepConfig } from '../types';

/**
 * Returnerer liste over inkluderte steg med tilgjengelighet og fullført-status.
 * Lineær flyt: et steg er tilgjengelig hvis alle foregående er fullført.
 */
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
