import { SøknadStepId } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/søknadContext';

export const useAppConsistencyChecker = (stepId: SøknadStepId) => {
    const ctx = useSøknadContext();
    const inconsistentStepId = ctx.checkConsistency(stepId) as SøknadStepId | undefined;
    return { inconsistentStepId };
};
