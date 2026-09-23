import { SøknadRoutes } from '../types/SøknadRoutes';
import { StepId } from '../types/StepId';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.OM_BARNET:
            return SøknadRoutes.OM_BARNET;
        case StepId.DELT_BOSTED:
            return SøknadRoutes.DELT_BOSTED;
        case StepId.LEGEERKLÆRING:
            return SøknadRoutes.LEGEERKLÆRING;
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
