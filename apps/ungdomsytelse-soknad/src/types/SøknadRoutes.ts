import { StepId } from './StepId';

export const SøknadStepRoutePath = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.INFO]: 'om-barnet',
    [StepId.OPPSUMMERING]: 'om-barnet',
    [StepId.KVITTERING]: 'soknad_sendt',
};

export enum SøknadRoutes {
    SOKNAD_ROOT = '/soknad/*',
    VELKOMMEN = '/soknad/velkommen',
    OM_BARNET = '/soknad/info',
    OPPSUMMERING = '/soknad/oppsummering',
    SØKNAD_SENDT = '/soknad/soknad_sendt',
    UKJENT_STEG = '/soknad/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
