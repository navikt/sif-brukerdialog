import { getSøknadStepConfig } from '../søknad/config/søknadStepConfig';
import { StepId } from '../søknad/config/StepId';
import { useSøknadContext } from './useSøknadContext';
import { useStepNavigation } from './useStepNavigation';

export const useStepConfig = (stepId: StepId) => {
    const {
        state: { søknadSteps, søknadStepsVedOppsummering },
    } = useSøknadContext();

    const stepConfig = getSøknadStepConfig(søknadSteps);

    const { goBack } = useStepNavigation(stepConfig[stepId]);

    /** Etter at bruker har vært på oppsummeringen, går hen ikke lenger bakover steg for steg */
    const skjulForrige = søknadStepsVedOppsummering !== undefined;

    return {
        goBack: skjulForrige ? undefined : goBack,
        includeBackLink: !skjulForrige,
        stepConfig,
    };
};
