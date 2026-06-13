import { StepDefinition } from '@sif/soknad-app';

import { SøknadStepId } from './SoknadStepId';

export const søknadStepConfig: Record<SøknadStepId, StepDefinition> = {
    [SøknadStepId.STARTDATO]: {
        route: 'startdato',
        isCompleted: (s) => s['startdato'] !== undefined,
    },
    [SøknadStepId.KONTONUMMER]: {
        route: 'kontonummer',
        isCompleted: (s) => s['kontonummer'] !== undefined,
    },
    [SøknadStepId.BOSTED]: {
        route: 'bosted',
        isCompleted: (s) => s['bosted'] !== undefined,
    },
    [SøknadStepId.BOSTED_UTLAND]: {
        route: 'bosted-utland',
        isCompleted: (s) => s['bostedUtland'] !== undefined,
    },
    [SøknadStepId.BARN]: {
        route: 'barn',
        isCompleted: (s) => s['barn'] !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [
    SøknadStepId.STARTDATO,
    SøknadStepId.KONTONUMMER,
    SøknadStepId.BOSTED,
    SøknadStepId.BOSTED_UTLAND,
    SøknadStepId.BARN,
    SøknadStepId.OPPSUMMERING,
];
