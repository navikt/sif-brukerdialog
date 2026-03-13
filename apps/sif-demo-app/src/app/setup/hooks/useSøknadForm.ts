import { createSøknadForm } from '@sif/soknad/hooks';

import { useSøknadContext } from '../context/søknadContext';
import { SøknadStepId } from '../søknad/søknadStepConfig';

export const useSøknadForm = createSøknadForm<SøknadStepId>(useSøknadContext);
