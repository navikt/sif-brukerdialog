import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { StepId } from '../types/StepId';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

const getSøknadSteps = (): StepId[] => {
    return [
        StepId.DINE_BARN,
        StepId.SITUASJON,
        StepId.FRAVÆR,
        StepId.LEGEERKLÆRING,
        StepId.MEDLEMSKAP,
        StepId.OPPSUMMERING,
    ];
};

export const getSøknadStepConfig = (): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(), SoknadApplicationType.SOKNAD, (step) => {
        return getSøknadStepRoute(step);
    });

export const getSøknadStepConfigForStep = (søknadsdata: Søknadsdata, stepId: StepId): StepConfig<StepId> => {
    // eslint-disable-next-line no-console
    console.log(søknadsdata);
    const config = getSøknadStepConfig()[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};
