import { useCallback } from 'react';

import { useCheckSøknadStepData } from '../../../rammeverk/consistency';
import { StepSøknadsdata } from '../../../rammeverk/types';
import { SøknadStepId, søknadStepOrder } from '../../config/søknadStepConfig';
import { useSøknadStore } from '../../hooks';
import { formValuesToSøknadsdata } from '../../utils/formValuesToSøknadsdata';

export const useAppConsistencyChecker = (stepId: SøknadStepId) => {
    const søknadsdata = useSøknadStore((s) => s.søknadState?.søknadsdata);

    const getSøknadsdataForStep = useCallback(
        (id: SøknadStepId): StepSøknadsdata | undefined => søknadsdata?.[id],
        [søknadsdata],
    );

    const inconsistentStepId = useCheckSøknadStepData<SøknadStepId>({
        currentStepId: stepId,
        stepOrder: søknadStepOrder,
        getSøknadsdataForStep,
        formValuesToSøknadsdata,
    });

    return { inconsistentStepId };
};
