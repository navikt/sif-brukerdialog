import { SøknadStepId } from '@app/setup';
import { createSøknadForm } from '@sif/soknad/hooks';

import { useSøknadContext } from '../context/søknadContext';

export const useSøknadForm = createSøknadForm<SøknadStepId>(useSøknadContext);
