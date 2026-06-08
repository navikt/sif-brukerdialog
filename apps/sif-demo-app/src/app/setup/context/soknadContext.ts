import { Søknadsdata } from '@app/types/Soknadsdata';
import { formValuesToSøknadsdata } from '@app/utils/formValuesToSoknadsdata';
import { createSøknadContext } from '@sif/soknad/context';

import { søknadStepConfig, SøknadStepId, søknadStepOrder } from '../config/soknadStepConfig';
import { useSøknadStore } from '../hooks/useSoknadStore';

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
