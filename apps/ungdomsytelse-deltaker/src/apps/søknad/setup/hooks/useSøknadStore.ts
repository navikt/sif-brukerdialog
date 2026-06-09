import { createSøknadStore } from '@sif/soknad/store';

import { søknadStepConfig, søknadStepOrder } from '../config/søknadStepConfig';
import { SøknadState } from '../types/SøknadState';
import { Søknadsdata } from '../types/Søknadsdata';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
