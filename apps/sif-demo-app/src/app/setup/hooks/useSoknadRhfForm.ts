import { createSøknadReactHookForm } from '@sif/soknad/hooks';

import { SøknadStepId } from '../config/soknadStepConfig';

export const useSøknadRhfForm = createSøknadReactHookForm<SøknadStepId>();
