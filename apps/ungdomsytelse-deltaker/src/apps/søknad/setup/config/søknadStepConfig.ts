import { StepConfig } from '@sif/soknad/types';

import { Søknadsdata } from '../types/Søknadsdata';
import { SøknadStepId } from './SøknadStepId';

export const søknadStepConfig: StepConfig<SøknadStepId, Søknadsdata> = {
    [SøknadStepId.KONTONUMMER]: {
        route: 'steg/kontonummer',
        isCompleted: (s) => s.kontonummer !== undefined,
    },
    [SøknadStepId.BARN]: {
        route: 'steg/barn',
        isCompleted: (s) => s.barn !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'steg/oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [SøknadStepId.KONTONUMMER, SøknadStepId.BARN, SøknadStepId.OPPSUMMERING];
