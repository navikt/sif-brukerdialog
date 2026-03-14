import { createSøknadReactHookForm } from '@sif/soknad/hooks';

import { SøknadStepId } from '../søknad/søknadStepConfig';

export const useSøknadForm = createSøknadReactHookForm<SøknadStepId>();
