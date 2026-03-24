import { Søknadsdata } from '@app/types/Søknadsdata';
import { formValuesToSøknadsdata } from '@app/utils/formValuesToSøknadsdata';
import { createSøknadContext } from '@sif/soknad/context';

import { søknadStepConfig, SøknadStepId, søknadStepOrder } from '../config/søknadStepConfig';
import { useSøknadStore } from '../hooks/useSøknadStore';

/**
 * App-spesifikk SøknadContext.
 * Kobler sammen rammeverk med app-konfigurasjon.
 */
export const { SøknadContextProvider, useSøknadsflyt } = createSøknadContext<Søknadsdata, SøknadStepId>({
    useStore: useSøknadStore as any, // Type assertion nødvendig pga generics
    stepConfig: søknadStepConfig,
    stepOrder: søknadStepOrder,
    formValuesToSøknadsdata,
    getSøknadsdataForStep: (stepId, søknadsdata) => søknadsdata?.[stepId],
    basePath: '/soknad',
});
