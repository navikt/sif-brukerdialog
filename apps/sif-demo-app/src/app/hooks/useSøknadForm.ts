import { SøknadStepId, useSøknadContext } from '@app/setup';
import { createSøknadForm } from '@sif/soknad/hooks';

export const useSøknadForm = createSøknadForm<SøknadStepId>(useSøknadContext);
