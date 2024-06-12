import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { StepId } from '../types/StepId';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [
        StepId.DINE_BARN,
        ...(søknadsdata.dineBarn?.harDeltBosted ? [StepId.DELT_BOSTED] : []),
        StepId.SITUASJON,
        StepId.FRAVÆR,
        StepId.LEGEERKLÆRING,
        StepId.MEDLEMSKAP,
        StepId.OPPSUMMERING,
    ];
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(søknadsdata), SoknadApplicationType.SOKNAD, (step) => {
        return getSøknadStepRoute(step);
    });

export const getSøknadStepConfigForStep = (søknadsdata: Søknadsdata, stepId: StepId): StepConfig<StepId> => {
    const config = getSøknadStepConfig(søknadsdata)[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};
