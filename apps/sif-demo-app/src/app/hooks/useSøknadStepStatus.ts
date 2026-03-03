import { StepStatusCallbacks } from '@rammeverk/types';

import { isStepIncluded } from '../config/søknadStepConfig';
import { Søknadsdata } from '../types/Søknadsdata';
import { useSøknadStore } from './useSøknadStore';

export const useSøknadStepStatus = (): StepStatusCallbacks => {
    const isStepCompleted = useSøknadStore((s) => s.isStepCompleted);

    return {
        isCompleted: isStepCompleted,
        isIncluded: (stepId: string) => {
            // Les fresh state fra store for å unngå closure over gammel søknadsdata
            const søknadsdata = useSøknadStore.getState().søknadState?.søknadsdata ?? ({} as Søknadsdata);
            return isStepIncluded(stepId, søknadsdata);
        },
    };
};
