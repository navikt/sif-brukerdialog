import { createSøknadStore } from '@sif/soknad/store';

import { Søknadsdata } from '../../types/Søknadsdata';
import { SøknadState, søknadStepConfig, søknadStepOrder } from '../søknad/søknadStepConfig';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
