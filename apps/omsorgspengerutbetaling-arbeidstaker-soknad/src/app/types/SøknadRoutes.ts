import { StepId } from './StepId';

export const SøknadStepRoutePath = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.FOSTERBARN]: 'fosterbarn',
    [StepId.SITUASJON]: 'situasjon',
    [StepId.FRAVÆR]: 'fravær',
    [StepId.LEGEERKLÆRING]: 'legeerklaring',
    [StepId.MEDLEMSKAP]: 'medlemskap',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.KVITTERING]: 'soknad_sendt',
};

export enum SøknadRoutes {
    INNLOGGET_ROOT = '/soknad/*',
    VELKOMMEN = '/soknad/velkommen',
    FOSTERBARN = '/soknad/fosterbarn',
    SITUASJON = '/soknad/situasjon',
    FRAVÆR = '/soknad/fravær',
    LEGEERKLÆRING = '/soknad/legeerklaring',
    MEDLEMSKAP = '/soknad/medlemskap',
    OPPSUMMERING = '/soknad/oppsummering',
    SØKNAD_SENDT = '/soknad/soknad_sendt',
    UKJENT_STEG = '/soknad/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
