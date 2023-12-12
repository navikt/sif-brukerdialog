import RouteConfig from '../config/routeConfig';
import { getSøknadStepConfig } from '../søknad/søknadStepConfig';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import {
    arbeidIPeriodeStepIsAvailable,
    arbeidssituasjonStepAvailable,
    legeerklæringStepAvailable,
    medlemskapStepAvailable,
    nattevåkOgBeredskapStepAvailable,
    omsorgstilbudStepAvailable,
    opplysningerOmBarnetStepAvailable,
    opplysningerOmTidsromStepAvailable,
    oppsummeringStepAvailable,
} from './stepUtils';

export const getNextStepRoute = (stepId: StepID, formValues?: SøknadFormValues): string | undefined => {
    return getSøknadStepConfig(formValues)[stepId].nextStepRoute || undefined;
};

export const isAvailable = (path: StepID | RouteConfig, values: SøknadFormValues, søknadHasBeenSent?: boolean) => {
    switch (path) {
        case StepID.OPPLYSNINGER_OM_BARNET:
            return opplysningerOmBarnetStepAvailable(values);
        case StepID.TIDSROM:
            return opplysningerOmTidsromStepAvailable(values);
        case StepID.ARBEIDSSITUASJON:
            return arbeidssituasjonStepAvailable(values);
        case StepID.ARBEIDSTID:
            return arbeidIPeriodeStepIsAvailable(values);
        case StepID.OMSORGSTILBUD:
            return omsorgstilbudStepAvailable(values);
        case StepID.NATTEVÅK_OG_BEREDSKAP:
            return nattevåkOgBeredskapStepAvailable;
        case StepID.LEGEERKLÆRING:
            return legeerklæringStepAvailable(values);
        case StepID.MEDLEMSKAP:
            return medlemskapStepAvailable(values);
        case StepID.SUMMARY:
            return oppsummeringStepAvailable(values);
        case RouteConfig.SØKNAD_SENDT_ROUTE:
            return søknadHasBeenSent === true;
    }

    return false;
};
