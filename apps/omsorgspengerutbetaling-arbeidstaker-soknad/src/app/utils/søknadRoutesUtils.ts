import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.FOSTERBARN:
            return SøknadRoutes.FOSTERBARN;
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
