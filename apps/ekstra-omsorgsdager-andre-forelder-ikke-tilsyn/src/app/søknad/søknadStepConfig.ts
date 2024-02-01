import { soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { SoknadApplicationType, SoknadStepsConfig, StepConfig } from '@navikt/sif-common-soknad-ds';
import { StepId } from '../types/StepId';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

const getSøknadSteps = (): StepId[] => {
    return [StepId.OM_ANNEN_FORELDER, StepId.ANNEN_FORELDER_SITUASJON, StepId.OM_BARNA, StepId.OPPSUMMERING];
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
