import { SøknadRoutes } from '../types/SøknadRoutes';
import { StepId } from '../types/StepId';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.DINE_BARN:
            return SøknadRoutes.DINE_BARN;
        case StepId.FRAVÆR:
            return SøknadRoutes.FRAVÆR;
        case StepId.LEGEERKLÆRING:
            return SøknadRoutes.LEGEERKLÆRING;
        case StepId.ARBEIDSSITUASJON:
            return SøknadRoutes.ARBEIDSSITUASJON;
        case StepId.FRAVÆR_FRA:
            return SøknadRoutes.FRAVÆR_FRA;
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
