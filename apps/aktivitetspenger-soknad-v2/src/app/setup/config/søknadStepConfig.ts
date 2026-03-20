import { StepConfig } from '@sif/soknad/types';

import { Søknadsdata } from '../../types/Søknadsdata';

export enum SøknadStepId {
    KONTONUMMER = 'kontonummer',
    BOSTED = 'bosted',
    BOSTED_UTLAND = 'BOSTED_UTLAND',
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
    [SøknadStepId.BOSTED_UTLAND]: {
        route: 'bosted-utland',
        isCompleted: (s) => s.BOSTED_UTLAND !== undefined,
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
    SøknadStepId.BOSTED_UTLAND,
    SøknadStepId.BARN,
    SøknadStepId.OPPSUMMERING,
];

export const stepTitles: Record<SøknadStepId, string> = {
    [SøknadStepId.KONTONUMMER]: 'Kontonummer',
    [SøknadStepId.BOSTED]: 'Bosted',
    [SøknadStepId.BOSTED_UTLAND]: 'Bosted i utlandet',
    [SøknadStepId.BARN]: 'Barn',
    [SøknadStepId.OPPSUMMERING]: 'Oppsummering',
};
