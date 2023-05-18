import { StepId } from '../søknad/config/StepId';
import { getSøknadStepConfig } from '../søknad/config/søknadStepConfig';
import { useStepNavigation } from './useStepNavigation';
import { useSøknadContext } from './useSøknadContext';

export const useStepConfig = (stepId: StepId) => {
    const {
        state: { søknadsdata, sak, valgtHvaSkalEndres: hvaSkalEndres },
    } = useSøknadContext();

    const stepConfig = getSøknadStepConfig(hvaSkalEndres, søknadsdata, sak.harUkjentArbeidsforhold);

    const { goBack } = useStepNavigation(stepConfig[stepId]);

    return {
        goBack,
        stepConfig,
    };
};
