import { SøknadRoutes } from '../types/SøknadRoutes';
import { StepId } from '../types/StepId';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.OPPLYSNINGER_OM_PLEIETRENGENDE:
            return SøknadRoutes.OPPLYSNINGER_OM_PLEIETRENGENDE;
        case StepId.LEGEERKLÆRING:
            return SøknadRoutes.LEGEERKLÆRING;
        case StepId.TIDSROM:
            return SøknadRoutes.TIDSROM;
        case StepId.ARBEIDSSITUASJON:
            return SøknadRoutes.ARBEIDSSITUASJON;
        case StepId.ARBEIDSTID:
            return SøknadRoutes.ARBEIDSTID;
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
