import { getApplicationRoute } from '../config/routeConfig';
import { StepID } from '../soknad/soknadStepsConfig';
import { SoknadFormData } from '../types/SoknadFormData';
import { Søknadstype } from '../types/Søknadstype';
import {
    beskrivelseStepIsAvailable,
    documentsStepIsAvailable,
    omsTypeStepIsAvailable,
    summaryStepAvailable,
} from './stepUtils';

export const getApplicationPageRoute = (søknadstype: Søknadstype, page: StepID | string): string => {
    const route = `${getApplicationRoute(søknadstype)}/${page}`;
    return route;
};

export const getAvailableSteps = (values: SoknadFormData, søknadstype: Søknadstype): StepID[] => {
    const steps: StepID[] = [];

    const visBeskrivelseStep = søknadstype === Søknadstype.pleiepengerLivetsSluttfase;
    const visBeskrivelsePPStep = søknadstype === Søknadstype.pleiepengerSyktBarn;
    const visOmsTypeStep = søknadstype === Søknadstype.omsorgspenger;

    if (visBeskrivelsePPStep && beskrivelseStepIsAvailable(values)) {
        steps.push(StepID.BESKRIVELSE_PP);
    }

    if (visBeskrivelseStep && beskrivelseStepIsAvailable(values)) {
        steps.push(StepID.BESKRIVELSE);
    }
    if (visOmsTypeStep && omsTypeStepIsAvailable(values)) {
        steps.push(StepID.OMS_TYPE);
    }

    if (documentsStepIsAvailable(values, søknadstype)) {
        steps.push(StepID.DOKUMENTER);
    }

    if (summaryStepAvailable(values)) {
        steps.push(StepID.OPPSUMMERING);
    }

    return steps;
};
