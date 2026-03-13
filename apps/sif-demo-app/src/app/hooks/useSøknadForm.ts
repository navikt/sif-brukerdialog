import { createSøknadForm } from '@sif/soknad/hooks';

import { SøknadStepId } from '@app/setup';
import { useSøknadContext } from '../context/søknadContext';

export const useSøknadForm = createSøknadForm<SøknadStepId>(useSøknadContext);
