import RouteConfig from '../config/routeConfig';
import { getSøknadStepConfigOld } from '../søknad/søknadStepsConfig';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/SøknadFormValues';
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

export const getNextStepRoute = (stepId: StepID, formData?: SøknadFormValues): string | undefined => {
    const stepConfig = getSøknadStepConfigOld(formData);
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
