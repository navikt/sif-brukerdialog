import { createSøknadStore } from '@rammeverk/foundation';

import { SøknadState, søknadStepConfig, søknadStepOrder } from '../config/søknadStepConfig';
import { Søknadsdata } from '../types/Søknadsdata';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
