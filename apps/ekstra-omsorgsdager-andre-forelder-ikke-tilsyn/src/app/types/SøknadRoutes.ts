import { StepId } from './StepId';

export const SøknadStepRoutePath = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.OM_ANNEN_FORELDER]: 'om-annen-forelder',
    [StepId.ANNEN_FORELDER_SITUASJON]: 'annen-forelder-situasjon',
    [StepId.OM_BARNA]: 'om-barna',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.KVITTERING]: 'soknad_sendt',
};

export enum SøknadRoutes {
    INNLOGGET_ROOT = '/soknad/*',
    VELKOMMEN = '/soknad/velkommen',
    OM_ANNEN_FORELDER = '/soknad/om-annen-forelder',
    ANNEN_FORELDER_SITUASJON = '/soknad/annen-forelder-situasjon',
    OM_BARNA = '/soknad/om-barna',
    OPPSUMMERING = '/soknad/oppsummering',
    SØKNAD_SENDT = '/soknad/soknad_sendt',
    UKJENT_STEG = '/soknad/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
