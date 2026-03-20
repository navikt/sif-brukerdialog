import { createSøknadReactHookForm } from '@sif/soknad/hooks';

import { SøknadStepId } from '../config/søknadStepConfig';

export const useSøknadRhfForm = createSøknadReactHookForm<SøknadStepId>();
