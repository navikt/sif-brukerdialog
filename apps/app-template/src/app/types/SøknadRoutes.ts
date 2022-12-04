import { StepId } from './StepId';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.PLEIETRENGENDE:
            return SøknadRoutes.PLEIETRENGENDE;
        case StepId.MEDLEMSKAP:
            return SøknadRoutes.MEDLEMSKAP;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.SØKNAD_SENDT:
            return SøknadRoutes.SØKNAD_SENDT;
    }
};

export enum SøknadRoutes {
    INTRO = '/intro',
    INNLOGGET_ROOT = '/soknad/*',
    VELKOMMEN = '/soknad/velkommen',
    PLEIETRENGENDE = '/soknad/pleietrengende',
    MEDLEMSKAP = '/soknad/medlemskap',
    OPPSUMMERING = '/soknad/oppsummering',
    SØKNAD_SENDT = '/soknad/soknad_sendt',
    UKJENT_STEG = '/soknad/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
