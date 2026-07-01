import { StepDefinition } from '@sif/soknad-app';

import { SøknadStepId } from '../types/SoknadStepId';

export const søknadStepConfig: Record<SøknadStepId, StepDefinition> = {
    [SøknadStepId.STARTDATO]: {
        route: 'startdato',
        isCompleted: (s) => s[SøknadStepId.STARTDATO] !== undefined,
    },
    [SøknadStepId.KONTONUMMER]: {
        route: 'kontonummer',
        isCompleted: (s) => s[SøknadStepId.KONTONUMMER] !== undefined,
    },
    [SøknadStepId.BOSTED]: {
        route: 'bosted',
        isCompleted: (s) => s[SøknadStepId.BOSTED] !== undefined,
    },
    [SøknadStepId.BOSTED_UTLAND]: {
        route: 'bosted-utland',
        isCompleted: (s) => s[SøknadStepId.BOSTED_UTLAND] !== undefined,
    },
    [SøknadStepId.BARN]: {
        route: 'barn',
        isCompleted: (s) => s[SøknadStepId.BARN] !== undefined,
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
