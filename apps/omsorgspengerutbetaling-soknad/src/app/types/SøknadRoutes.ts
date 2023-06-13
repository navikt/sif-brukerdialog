import { StepId } from './StepId';

export const SøknadStepRoutePath = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.DINE_BARN]: 'dine-barn',
    [StepId.FRAVÆR]: 'fravæer',
    [StepId.DOKUMENTER_SMITTEVERNHENSYN]: 'dokumenter-smittevernhensyn',
    [StepId.LEGEERKLÆRING]: 'legeerklaring',
    [StepId.ARBEIDSSITUASJON]: 'arbeidssituasjon',
    [StepId.FRAVÆR_FRA]: 'fravæer-fra',
    [StepId.MEDLEMSKAP]: 'medlemskap',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.KVITTERING]: 'soknad_sendt',
};

export enum SøknadRoutes {
    INNLOGGET_ROOT = '/soknad/*',
    VELKOMMEN = '/soknad/velkommen',
    DINE_BARN = '/soknad/dine-barn',
    FRAVÆR = '/soknad/fravæer',
    DOKUMENTER_SMITTEVERNHENSYN = '/soknad/dokumenter-smittevernhensyn',
    LEGEERKLÆRING = '/soknad/legeerklaring',
    ARBEIDSSITUASJON = '/soknad/arbeidssituasjon',
    FRAVÆR_FRA = '/soknad/fravæer-fra',
    MEDLEMSKAP = '/soknad/medlemskap',
    OPPSUMMERING = '/soknad/oppsummering',
    SØKNAD_SENDT = '/soknad/soknad_sendt',
    UKJENT_STEG = '/soknad/ukjent-steg',
    IKKE_TILGANG = '/ikke-tilgang',
}
