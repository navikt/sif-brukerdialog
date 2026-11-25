import { StepDefinition } from '@sif/soknad-app';

import { Søknadsdata } from '../types/Soknadsdata';
import { SøknadStepId } from '../types/SoknadStepId';
import { inkluderDeltBostedStep } from '../utils/deltBostedUtils';

export const søknadStepConfig: Record<SøknadStepId, StepDefinition> = {
    [SøknadStepId.OM_BARNET]: {
        route: 'om-barnet',
        isCompleted: (s) => (s as Søknadsdata)[SøknadStepId.OM_BARNET] !== undefined,
    },
    [SøknadStepId.LEGEERKLÆRING]: {
        route: 'legeerklaring',
        isCompleted: (s) => (s as Søknadsdata)[SøknadStepId.LEGEERKLÆRING] !== undefined,
    },
    [SøknadStepId.DELT_BOSTED]: {
        route: 'delt-bosted',
        isIncluded: (s) => inkluderDeltBostedStep((s as Søknadsdata)[SøknadStepId.OM_BARNET]),
        isCompleted: (s) => (s as Søknadsdata)[SøknadStepId.DELT_BOSTED] !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [
    SøknadStepId.OM_BARNET,
    SøknadStepId.LEGEERKLÆRING,
    SøknadStepId.DELT_BOSTED,
    SøknadStepId.OPPSUMMERING,
];
