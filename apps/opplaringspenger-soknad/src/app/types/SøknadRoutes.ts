import { StepId } from './StepId';

export const SøknadStepRoutePath = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.OM_BARNET]: 'om_barnet',
    [StepId.LEGEERKLÆRING]: 'legeerklaring',
    [StepId.KURS]: 'opplaring',
    [StepId.ARBEIDSSITUASJON]: 'arbeidssituasjon',
    [StepId.ARBEIDSTID]: 'arbeidstid',
    [StepId.MEDLEMSKAP]: 'medlemskap',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.KVITTERING]: 'soknad_sendt',
};

export enum SøknadRoutes {
    INNLOGGET_ROOT = '/soknad/*',
    VELKOMMEN = '/soknad/velkommen',
    BARN = '/soknad/om_barnet',
    KURS = '/soknad/opplaring',
    LEGEERKLÆRING = '/soknad/legeerklaring',
    ARBEIDSSITUASJON = '/soknad/arbeidssituasjon',
    ARBEIDSTID = '/soknad/arbeidstid',
    MEDLEMSKAP = '/soknad/medlemskap',
    OPPSUMMERING = '/soknad/oppsummering',
    SØKNAD_SENDT = '/soknad/soknad_sendt',
    UKJENT_STEG = '/soknad/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
