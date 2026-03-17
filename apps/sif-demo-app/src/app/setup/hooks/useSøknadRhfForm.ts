import { createSøknadReactHookForm } from '@sif/soknad/hooks';

import { SøknadStepId } from '../søknad/søknadStepConfig';

export const useSøknadRhfForm = createSøknadReactHookForm<SøknadStepId>();
