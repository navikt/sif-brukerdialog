import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [StepId.OM_BARNET, StepId.DELT_BOSTED, StepId.LEGEERKLÆRING, StepId.OPPSUMMERING];
};

export const getNextStep = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.OM_BARNET;
        case StepId.OM_BARNET:
            return SøknadRoutes.DELT_BOSTED;
        case StepId.DELT_BOSTED:
            return SøknadRoutes.LEGEERKLÆRING;
        case StepId.LEGEERKLÆRING:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.SØKNAD_SENDT;
        default:
            return SøknadRoutes.VELKOMMEN;
    }
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId, SøknadRoutes> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(søknadsdata), SoknadApplicationType.SOKNAD);
