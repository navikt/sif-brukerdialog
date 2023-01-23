import {
    SoknadApplicationType,
    SoknadStepsConfig,
    StepConfig,
} from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { StepId } from '../types/StepId';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

// const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
const getSøknadSteps = (): StepId[] => {
    return [StepId.OM_BARNET, StepId.OPPSUMMERING];
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(), SoknadApplicationType.SOKNAD, (step) => {
        // eslint-disable-next-line no-console
        console.log(søknadsdata);
        return getSøknadStepRoute(step);
    });

export const getSøknadStepConfigForStep = (søknadsdata: Søknadsdata, stepId: StepId): StepConfig<StepId> => {
    const config = getSøknadStepConfig(søknadsdata)[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};
