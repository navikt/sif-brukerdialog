import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { StepId } from './StepId';
import { SøknadRoutes } from './SøknadRoutes';

export const getSøknadSteps = (): StepId[] => {
    return [StepId.AKTIVITET, StepId.ARBEIDSTID, StepId.OPPSUMMERING];
};

/** Denne kan nok endres til å kun hente "neste" fra getSøknadSteps */
export const getNextStep = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.AKTIVITET;
        case StepId.AKTIVITET:
            return SøknadRoutes.ARBEIDSTID;
        case StepId.ARBEIDSTID:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.SØKNAD_SENDT;
        default:
            return SøknadRoutes.VELKOMMEN;
    }
};

export const getSøknadStepConfig = (): SoknadStepsConfig<StepId, SøknadRoutes> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(), SoknadApplicationType.MELDING);
