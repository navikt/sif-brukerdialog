import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.OM_BARNET:
            return SøknadRoutes.BARN;
        case StepId.LEGEERKLÆRING:
            return SøknadRoutes.LEGEERKLÆRING;
        case StepId.KURS:
            return SøknadRoutes.KURS;
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
