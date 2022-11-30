import { StepId } from './StepId';

export const SøknadStepRoutePath = {
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
