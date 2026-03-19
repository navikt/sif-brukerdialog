import { StepConfig } from '@sif/soknad/types';

import { Søknadsdata } from '../../types/Søknadsdata';

export enum SøknadStepId {
    KONTONUMMER = 'kontonummer',
    BOSTED = 'bosted',
    MEDLEMSKAP = 'medlemskap',
    BARN = 'barn',
    OPPSUMMERING = 'oppsummering',
}

export const søknadStepConfig: StepConfig<SøknadStepId, Søknadsdata> = {
    [SøknadStepId.KONTONUMMER]: {
        route: 'kontonummer',
        isCompleted: (s) => s.kontonummer !== undefined,
    },
    [SøknadStepId.BOSTED]: {
        route: 'bosted',
        isCompleted: (s) => s.bosted !== undefined,
    },
    [SøknadStepId.MEDLEMSKAP]: {
        route: 'medlemskap',
        isCompleted: (s) => s.medlemskap !== undefined,
    },
    [SøknadStepId.BARN]: {
        route: 'barn',
        isCompleted: (s) => s.barn !== undefined,
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

export const stepTitles: Record<SøknadStepId, string> = {
    [SøknadStepId.KONTONUMMER]: 'Kontonummer',
    [SøknadStepId.BOSTED]: 'Bosted',
    [SøknadStepId.MEDLEMSKAP]: 'Medlemskap i folketrygden',
    [SøknadStepId.BARN]: 'Barn',
    [SøknadStepId.OPPSUMMERING]: 'Oppsummering',
};
