import { getSøknadStepConfig } from '../søknad/config/søknadStepConfig';
import { StepId } from '../søknad/config/StepId';
import { useSøknadContext } from './useSøknadContext';
import { useStepNavigation } from './useStepNavigation';

export const useStepConfig = (stepId: StepId) => {
    const {
        state: { søknadSteps },
    } = useSøknadContext();

    const stepConfig = getSøknadStepConfig(søknadSteps);

    const { goBack } = useStepNavigation(stepConfig[stepId]);

    return {
        goBack,
        stepConfig,
    };
};
