import { createSøknadStore as store } from '@sif/soknad/store';

import { Søknadsdata } from '../../types/Soknadsdata';
import { SøknadState } from '../../types/SoknadState';
import { søknadStepConfig, søknadStepOrder } from '../config/soknadStepConfig';

export const useSøknadStore = store<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
