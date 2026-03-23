import { Søknadsdata } from '@app/types/Søknadsdata';
import { SøknadState } from '@app/types/SøknadState';
import { createSøknadStore } from '@sif/soknad/store';

import { søknadStepConfig, søknadStepOrder } from '../config/søknadStepConfig';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
