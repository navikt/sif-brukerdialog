import { StepId } from './StepId';

export const SøknadStepRoutePath = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.OM_BARNET]: 'om-barnet',
    [StepId.DELT_BOSTED]: 'delt-bosted',
    [StepId.LEGEERKLÆRING]: 'legeerklaring',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.KVITTERING]: 'soknad_sendt',
};

export enum SøknadRoutes {
    INNLOGGET_ROOT = '/soknad/*',
    VELKOMMEN = '/soknad/velkommen',
    OM_BARNET = '/soknad/om-barnet',
    DELT_BOSTED = '/soknad/delt-bosted',
    LEGEERKLÆRING = '/soknad/legeerklaring',
    OPPSUMMERING = '/soknad/oppsummering',
    SØKNAD_SENDT = '/soknad/soknad_sendt',
    UKJENT_STEG = '/soknad/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
