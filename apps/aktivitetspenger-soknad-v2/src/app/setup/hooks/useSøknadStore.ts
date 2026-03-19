import { createSøknadStore } from '@sif/soknad/store';

import { Søknadsdata } from '../../types/Søknadsdata';
import { SøknadState } from '../../types/SøknadState';
import { søknadStepConfig, søknadStepOrder } from '../config/søknadStepConfig';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
