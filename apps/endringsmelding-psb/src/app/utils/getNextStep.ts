import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const getNextStep = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.ARBEIDSTID;
        case StepId.ARBEIDSTID:
            return SøknadRoutes.OMSORGSTILBUD;
        case StepId.OMSORGSTILBUD:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.SØKNAD_SENDT;
        default:
            return SøknadRoutes.VELKOMMEN;
    }
};
