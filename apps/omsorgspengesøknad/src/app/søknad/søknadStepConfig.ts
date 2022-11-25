import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

const getSøknadSteps = (_: Søknadsdata): StepId[] => {
    // eslint-disable-next-line no-console
    return [StepId.OM_BARNET, StepId.DELT_BOSTED, StepId.LEGEERKLÆRING, StepId.OPPSUMMERING];
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId, SøknadRoutes> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(søknadsdata), SoknadApplicationType.SOKNAD);
