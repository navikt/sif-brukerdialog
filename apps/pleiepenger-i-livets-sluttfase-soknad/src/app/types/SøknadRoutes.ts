import { StepId } from './StepId';

export const SøknadStepRoutePath = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.OPPLYSNINGER_OM_PLEIETRENGENDE]: 'opplysninger-om-pleietrengende',
    [StepId.LEGEERKLÆRING]: 'legeerklaring',
    [StepId.TIDSROM]: 'tidsrom',
    [StepId.ARBEIDSSITUASJON]: 'arbeidssituasjon',
    [StepId.ARBEIDSTID]: 'arbeidstid',
    [StepId.MEDLEMSKAP]: 'medlemskap',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.KVITTERING]: 'soknad_sendt',
};

export enum SøknadRoutes {
    INNLOGGET_ROOT = '/soknad/*',
    VELKOMMEN = '/soknad/velkommen',
    OPPLYSNINGER_OM_PLEIETRENGENDE = '/soknad/opplysninger-om-pleietrengende',
    LEGEERKLÆRING = '/soknad/legeerklaring',
    TIDSROM = '/soknad/tidsrom',
    ARBEIDSSITUASJON = '/soknad/arbeidssituasjon',
    ARBEIDSTID = '/soknad/arbeidstid',
    MEDLEMSKAP = '/soknad/medlemskap',
    OPPSUMMERING = '/soknad/oppsummering',
    SØKNAD_SENDT = '/soknad/soknad_sendt',
    UKJENT_STEG = '/soknad/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
