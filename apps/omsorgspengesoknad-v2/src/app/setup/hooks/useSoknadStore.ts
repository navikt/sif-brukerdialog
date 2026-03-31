import { Søknadsdata } from '@app/types/Soknadsdata';
import { SøknadState } from '@app/types/SoknadState';
import { createSøknadStore } from '@sif/soknad/store';

import { søknadStepConfig, søknadStepOrder } from '../config/soknadStepConfig';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
