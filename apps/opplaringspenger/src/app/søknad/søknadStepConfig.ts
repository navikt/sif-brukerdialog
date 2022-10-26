import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { Søknadsdata } from '../types/Søknadsdata';

const getSøknadStep = (søknadsdata: Søknadsdata): StepId[] => {
    return [StepId.PLEIETRENGENDE, StepId.INSTITUSJON, StepId.ARBEID, StepId.OPPLÆRING, StepId.OPPSUMMERING];
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId, SøknadRoutes> =>
    soknadStepUtils.getStepsConfig(getSøknadStep(søknadsdata), SoknadApplicationType.SOKNAD);
