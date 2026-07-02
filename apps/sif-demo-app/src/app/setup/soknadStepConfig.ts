import { StepDefinition } from '@sif/soknad-app';

import { SøknadStepId } from '@app/types/SoknadStepId';

export const søknadStepConfig: Record<SøknadStepId, StepDefinition> = {
    [SøknadStepId.BARN]: {
        route: 'barn',
        isCompleted: (s) => s[SøknadStepId.BARN] !== undefined,
    },
    [SøknadStepId.BOSTED]: {
        route: 'bosted',
        isCompleted: (s) => s[SøknadStepId.BOSTED] !== undefined,
    },
    [SøknadStepId.VEDLEGG]: {
        route: 'vedlegg',
        isCompleted: (s) => s[SøknadStepId.VEDLEGG] !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [
    SøknadStepId.BARN,
    SøknadStepId.BOSTED,
    SøknadStepId.VEDLEGG,
    SøknadStepId.OPPSUMMERING,
];
