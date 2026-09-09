import { StepDefinition } from '@sif/soknad-app';

import { SøknadStepId } from '../types/SoknadStepId';

export const søknadStepConfig: Record<SøknadStepId, StepDefinition> = {
    [SøknadStepId.KONTONUMMER]: {
        route: 'kontonummer',
        isCompleted: (s) => s[SøknadStepId.KONTONUMMER] !== undefined,
    },
    [SøknadStepId.BOSTED]: {
        route: 'bosted',
        isCompleted: (s) => s[SøknadStepId.BOSTED] !== undefined,
    },
    [SøknadStepId.MEDLEMSKAP]: {
        route: 'medlemskap',
        isCompleted: (s) => s[SøknadStepId.MEDLEMSKAP] !== undefined,
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
    SøknadStepId.KONTONUMMER,
    SøknadStepId.BOSTED,
    SøknadStepId.MEDLEMSKAP,
    SøknadStepId.BARN,
    SøknadStepId.OPPSUMMERING,
];
