import { createSøknadForm } from '@sif/soknad/hooks';

import { SøknadStepId } from '../config/søknadStepConfig';
import { useSøknadContext } from '../context/søknadContext';

export const useSøknadForm = createSøknadForm<SøknadStepId>(useSøknadContext);
