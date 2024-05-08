import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.DINE_BARN:
            return SøknadRoutes.DINE_BARN;
        case StepId.DELT_BOSTED:
            return SøknadRoutes.DELT_BOSTED;
        case StepId.SITUASJON:
            return SøknadRoutes.SITUASJON;
        case StepId.FRAVÆR:
            return SøknadRoutes.FRAVÆR;
        case StepId.LEGEERKLÆRING:
            return SøknadRoutes.LEGEERKLÆRING;
        case StepId.MEDLEMSKAP:
            return SøknadRoutes.MEDLEMSKAP;
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
