import { StepId } from '../søknad/config/StepId';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';

export const getNextStep = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.SØKNAD_SENDT;
        default:
            return SøknadRoutes.VELKOMMEN;
    }
};
