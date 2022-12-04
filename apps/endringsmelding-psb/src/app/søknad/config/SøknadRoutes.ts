import { StepId } from './StepId';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.AKTIVITET:
            return SøknadRoutes.AKTIVITET;
        case StepId.ARBEIDSTID:
            return SøknadRoutes.ARBEIDSTID;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.SØKNAD_SENDT:
            return SøknadRoutes.SØKNAD_SENDT;
    }
};

export const SøknadStepRoute = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.AKTIVITET]: 'aktivitet',
    [StepId.ARBEIDSTID]: 'arbeidstid',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.SØKNAD_SENDT]: 'soknad_sendt',
};

export enum SøknadRoutes {
    APP_ROOT = '/',
    INNLOGGET_ROOT = '/melding/*',
    VELKOMMEN = '/melding/velkommen',
    AKTIVITET = '/melding/aktivitet',
    ARBEIDSTID = '/melding/arbeidstid',
    OPPSUMMERING = '/melding/oppsummering',
    SØKNAD_SENDT = '/melding/melding_sendt',
    UKJENT_STEG = '/melding/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
