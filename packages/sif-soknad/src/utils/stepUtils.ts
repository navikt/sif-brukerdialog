import { ProgressStep } from '@navikt/sif-common-ui';

import { IncludedStep } from '../types';

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
