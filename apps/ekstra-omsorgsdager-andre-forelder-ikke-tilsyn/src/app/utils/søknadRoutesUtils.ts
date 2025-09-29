import { SøknadRoutes } from '../types/SøknadRoutes';
import { StepId } from '../types/StepId';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.OM_ANNEN_FORELDER:
            return SøknadRoutes.OM_ANNEN_FORELDER;
        case StepId.ANNEN_FORELDER_SITUASJON:
            return SøknadRoutes.ANNEN_FORELDER_SITUASJON;
        case StepId.OM_BARNA:
            return SøknadRoutes.OM_BARNA;
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
