import { Søknadsdata } from '@app/types/Søknadsdata';
import { StepConfig } from '@sif/soknad/types';

import { SøknadStepId } from './SøknadStepId';

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
        isCompleted: (s) => s.bostedUtland !== undefined,
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
