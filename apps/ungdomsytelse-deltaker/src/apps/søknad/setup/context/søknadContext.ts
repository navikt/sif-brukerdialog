import { createSøknadContext } from '@sif/soknad/context';

import { formValuesToSøknadsdata } from '../../utils/formValuesToSøknadsdata';
import { søknadStepConfig, søknadStepOrder } from '../config/søknadStepConfig';
import { SøknadStepId } from '../config/SøknadStepId';
import { useSøknadStore } from '../hooks/useSøknadStore';
import { Søknadsdata } from '../types/Søknadsdata';

export const { SøknadContextProvider, useSøknadsflyt } = createSøknadContext<Søknadsdata, SøknadStepId>({
    useStore: useSøknadStore as any,
    stepConfig: søknadStepConfig,
    stepOrder: søknadStepOrder,
    formValuesToSøknadsdata,
    getSøknadsdataForStep: (stepId, søknadsdata) => søknadsdata?.[stepId],
    basePath: '/soknad',
});
