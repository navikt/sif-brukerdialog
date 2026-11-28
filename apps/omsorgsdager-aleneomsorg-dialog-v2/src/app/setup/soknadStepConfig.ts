import { StepDefinition } from '@sif/soknad-app';

import { Søknadsdata } from '../types/Soknadsdata';
import { SøknadStepId } from '../types/SoknadStepId';

export const søknadStepConfig: Record<SøknadStepId, StepDefinition> = {
    [SøknadStepId.OM_OMSORGEN_FOR_BARN]: {
        route: 'om-omsorgen-for-barn',
        isCompleted: (data) => (data as Søknadsdata)[SøknadStepId.OM_OMSORGEN_FOR_BARN] !== undefined,
    },
    [SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG]: {
        route: 'tidspunkt-for-aleneomsorg',
        isCompleted: (data) => (data as Søknadsdata)[SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG] !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [
    SøknadStepId.OM_OMSORGEN_FOR_BARN,
    SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG,
    SøknadStepId.OPPSUMMERING,
];
