import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const getNextStep = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.PLEIETRENGENDE;
        case StepId.PLEIETRENGENDE:
            return SøknadRoutes.INSTITUSJON;
        case StepId.INSTITUSJON:
            return SøknadRoutes.OPPLÆRING;
        case StepId.OPPLÆRING:
            return SøknadRoutes.MEDLEMSKAP;
        case StepId.MEDLEMSKAP:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.SØKNAD_SENDT;
        default:
            return SøknadRoutes.VELKOMMEN;
    }
};
