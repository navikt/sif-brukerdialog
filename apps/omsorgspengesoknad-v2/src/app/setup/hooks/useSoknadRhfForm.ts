import { createSøknadReactHookForm } from '@sif/soknad/hooks';

import { SøknadStepId } from '../config/SoknadStepId';

export const useSøknadRhfForm = createSøknadReactHookForm<SøknadStepId>();
