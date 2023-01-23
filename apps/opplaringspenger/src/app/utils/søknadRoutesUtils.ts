import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.OM_BARNET:
            return SøknadRoutes.OM_BARNET;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.KVITTERING:
            return SøknadRoutes.SØKNAD_SENDT;
    }
};

export const isValidSøknadRoute = (route?: SøknadRoutes): boolean => {
    if (!route) {
        return false;
    }
    return Object.values(SøknadRoutes).includes(route);
};
