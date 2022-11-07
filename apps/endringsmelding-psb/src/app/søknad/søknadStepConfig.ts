import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [StepId.OPPSUMMERING];
};

export const getNextStep = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.SØKNAD_SENDT;
        default:
            return SøknadRoutes.VELKOMMEN;
    }
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId, SøknadRoutes> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(søknadsdata), SoknadApplicationType.SOKNAD);
