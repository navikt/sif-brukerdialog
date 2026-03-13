import { SøknadState, søknadStepConfig, søknadStepOrder } from '@app/setup';
import { createSøknadStore } from '@sif/soknad/store';

import { Søknadsdata } from '../../types/Søknadsdata';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
