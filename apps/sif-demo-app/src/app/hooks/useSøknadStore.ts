import { createSøknadStore } from '@rammeverk/state';

import { SøknadState } from '../config/stegConfig';
import { Søknadsdata } from '../types/Søknadsdata';

export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>();
