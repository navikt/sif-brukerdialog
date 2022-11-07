import { getApplicationRoute } from '../config/routeConfig';
import { getStepConfig, StepID } from '../config/stepConfig';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';
import { beskrivelseStepIsAvailable, documentsStepIsAvailable, summaryStepAvailable } from './stepUtils';

export const getApplicationPageRoute = (søknadstype: ApplicationType, page: StepID | string): string => {
    const route = `${getApplicationRoute(søknadstype)}/${page}`;
    return route;
};

export const getNextStepRoute = (søknadstype: ApplicationType, stepId: StepID): string | undefined => {
    const stepConfig = getStepConfig(søknadstype);
    const nextStep = stepConfig[stepId]?.nextStep;
    return nextStep || undefined;
};

export const isStepAvailable = (søknadstype: ApplicationType, path: StepID | string, values: ApplicationFormData) => {
    if (beskrivelseStepIsAvailable(values) === false) {
        return false;
    }
    switch (path) {
        case StepID.BESKRIVELSE:
            return (
                søknadstype === ApplicationType.pleiepengerBarn ||
                søknadstype === ApplicationType.pleiepengerLivetsSluttfase
            );
        case StepID.OMS_TYPE:
            return søknadstype === ApplicationType.omsorgspenger;
        case StepID.DOKUMENTER:
            return documentsStepIsAvailable(values, søknadstype);
        case StepID.OPPSUMMERING:
            return summaryStepAvailable(values);
    }
    return true;
};
