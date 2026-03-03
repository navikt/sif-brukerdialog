import { StepStatusCallbacks } from '@rammeverk/types';

import { skalStegVises } from '../config/stegConfig';
import { Søknadsdata } from '../types/Søknadsdata';
import { useSøknadStore } from './useSøknadStore';

export const useStegStatus = (): StepStatusCallbacks => {
    const erStegFullført = useSøknadStore((s) => s.isStepCompleted);

    return {
        isCompleted: erStegFullført,
        isIncluded: (stepId: string) => {
            // Les fresh state fra store for å unngå closure over gammel søknadsdata
            const søknadsdata = useSøknadStore.getState().søknadState?.søknadsdata ?? ({} as Søknadsdata);
            return skalStegVises(stepId, søknadsdata);
        },
    };
};
