import { createSøknadStore as store } from '@sif/soknad/store';

import { Søknadsdata } from '../../types/Søknadsdata';
import { SøknadState } from '../../types/SøknadState';
import { søknadStepConfig, søknadStepOrder } from '../config/søknadStepConfig';

export const useSøknadStore = store<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
