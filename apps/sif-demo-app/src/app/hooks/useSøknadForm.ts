import { createSøknadForm } from '../../rammeverk/hooks';
import { SøknadStepId } from '../config/søknadStepConfig';
import { useSøknadContext } from '../context/søknadContext';

export const useSøknadForm = createSøknadForm<SøknadStepId>(useSøknadContext);
