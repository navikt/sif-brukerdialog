import { getApplicationRoute } from '../config/routeConfig';
import { StepID } from '../config/stepConfig';
import { SoknadFormData } from '../types/SoknadFormData';
import { ApplicationType } from '../types/ApplicationType';
import {
    beskrivelseStepIsAvailable,
    documentsStepIsAvailable,
    omsTypeStepIsAvailable,
    summaryStepAvailable,
} from './stepUtils';

export const getApplicationPageRoute = (søknadstype: ApplicationType, page: StepID | string): string => {
    const route = `${getApplicationRoute(søknadstype)}/${page}`;
    return route;
};

export const getAvailableSteps = (values: SoknadFormData, søknadstype: ApplicationType): StepID[] => {
    const steps: StepID[] = [];

    const visBeskrivelseStep =
        søknadstype === ApplicationType.pleiepengerBarn || søknadstype === ApplicationType.pleiepengerLivetsSluttfase;
    const visOmsTypeStep = søknadstype === ApplicationType.omsorgspenger;

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
