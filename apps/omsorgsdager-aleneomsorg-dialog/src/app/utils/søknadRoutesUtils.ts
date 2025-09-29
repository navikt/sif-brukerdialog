import { SøknadRoutes } from '../types/SøknadRoutes';
import { StepId } from '../types/StepId';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.OM_OMSORGEN_FOR_BARN:
            return SøknadRoutes.OM_OMSORGEN_FOR_BARN;
        case StepId.TIDSPUNKT_FOR_ALENEOMSORG:
            return SøknadRoutes.TIDSPUNKT_FOR_ALENEOMSORG;
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
