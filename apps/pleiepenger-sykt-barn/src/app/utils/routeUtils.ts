import RouteConfig from '../config/routeConfig';
import { getSøknadStepConfig, StepID } from '../søknad/søknadStepsConfig';
import { SøknadFormValues } from '../types/SøknadFormValues';
import {
    arbeidssituasjonStepAvailable,
    legeerklæringStepAvailable,
    medlemskapStepAvailable,
    opplysningerOmBarnetStepAvailable,
    opplysningerOmTidsromStepAvailable,
    oppsummeringStepAvailable,
    omsorgstilbudStepAvailable,
    nattevåkOgBeredskapStepAvailable,
    arbeidIPeriodeStepIsAvailable,
} from './stepUtils';

export const getNextStepRoute = (stepId: StepID, formData?: SøknadFormValues): string | undefined => {
    const stepConfig = getSøknadStepConfig(formData);
    const nextStep =
        stepConfig[stepId] && stepConfig[stepId].included === true ? stepConfig[stepId].nextStep : undefined;

    return nextStep ? nextStep : undefined;
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
