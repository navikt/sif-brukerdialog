import { createSøknadReactHookForm } from '@sif/soknad/hooks';

import { SøknadStepId } from '../config/SøknadStepId';

export const useSøknadRhfForm = createSøknadReactHookForm<SøknadStepId>();
