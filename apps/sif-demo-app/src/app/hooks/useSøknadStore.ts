import { createSøknadStore } from '@rammeverk/state';

import { søknadStepConfig, søknadStepOrder, SøknadState } from '../config/søknadStepConfig';
import { Søknadsdata } from '../types/Søknadsdata';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
