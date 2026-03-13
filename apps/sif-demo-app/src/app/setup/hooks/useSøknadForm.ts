import { createSøknadForm } from '@sif/soknad/hooks';

import { SøknadStepId } from '../søknad/søknadStepConfig';

export const useSøknadForm = createSøknadForm<SøknadStepId>();
