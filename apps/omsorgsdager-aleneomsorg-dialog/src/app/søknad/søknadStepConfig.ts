import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';

import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { StepId } from '../types/StepId';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

const getSøknadSteps = (): StepId[] => {
    return [StepId.OM_OMSORGEN_FOR_BARN, StepId.TIDSPUNKT_FOR_ALENEOMSORG, StepId.OPPSUMMERING];
};

export const getSøknadStepConfig = (): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(), SoknadApplicationType.SOKNAD, (step) => {
        return getSøknadStepRoute(step);
    });

export const getSøknadStepConfigForStep = (_søknadsdata: Søknadsdata, stepId: StepId): StepConfig<StepId> => {
    const config = getSøknadStepConfig()[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};
