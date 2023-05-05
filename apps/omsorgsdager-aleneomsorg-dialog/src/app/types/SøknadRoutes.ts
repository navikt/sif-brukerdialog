import { StepId } from './StepId';

export const SøknadStepRoutePath = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.OM_OMSORGEN_FOR_BARN]: 'om-omsorgen-for-barn',
    [StepId.TIDSPUNKT_FOR_ALENEOMSORG]: 'tidspunkt-for-aleneomsorg',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.KVITTERING]: 'soknad_sendt',
};

export enum SøknadRoutes {
    INNLOGGET_ROOT = '/soknad/*',
    VELKOMMEN = '/soknad/velkommen',
    OM_OMSORGEN_FOR_BARN = '/soknad/om-omsorgen-for-barn',
    TIDSPUNKT_FOR_ALENEOMSORG = '/soknad/tidspunkt-for-aleneomsorg',
    OPPSUMMERING = '/soknad/oppsummering',
    SØKNAD_SENDT = '/soknad/soknad_sendt',
    UKJENT_STEG = '/soknad/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
