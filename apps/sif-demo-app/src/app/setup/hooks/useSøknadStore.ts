import { createSøknadStore } from '@sif/soknad/store';

import { SøknadState, søknadStepConfig, søknadStepOrder } from '../søknad/søknadStepConfig';

import { Søknadsdata } from '../../types/Søknadsdata';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
