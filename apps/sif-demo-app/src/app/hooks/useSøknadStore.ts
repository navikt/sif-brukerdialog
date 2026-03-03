import { createSøknadStore } from '@rammeverk/state';

import { SøknadState } from '../config/søknadStepConfig';
import { Søknadsdata } from '../types/Søknadsdata';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>();
