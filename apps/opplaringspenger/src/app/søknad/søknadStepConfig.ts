import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.PLEIETRENGENDE:
            return SøknadRoutes.PLEIETRENGENDE;
        case StepId.ARBEID:
            return SøknadRoutes.ARBEID;
        case StepId.OPPLÆRING:
            return SøknadRoutes.OPPLÆRING;
        case StepId.MEDLEMSKAP:
            return SøknadRoutes.MEDLEMSKAP;
        case StepId.INSTITUSJON:
            return SøknadRoutes.INSTITUSJON;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.SØKNAD_SENDT:
            return SøknadRoutes.SØKNAD_SENDT;
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [
        StepId.PLEIETRENGENDE,
        StepId.INSTITUSJON,
        StepId.ARBEID,
        StepId.OPPLÆRING,
        StepId.MEDLEMSKAP,
        StepId.OPPSUMMERING,
    ];
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(søknadsdata), SoknadApplicationType.SOKNAD);
