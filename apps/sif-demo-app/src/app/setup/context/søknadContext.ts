import { Søknadsdata } from '@app/types/Søknadsdata';
import { formValuesToSøknadsdata } from '@app/utils/formValuesToSøknadsdata';
import { createSøknadContext } from '@sif/soknad/context';

import { useSøknadStore } from '../hooks/useSøknadStore';
import { søknadStepConfig, søknadStepOrder, stepTitles } from '../søknad/søknadStepConfig';

/**
 * App-spesifikk SøknadContext.
 * Kobler sammen rammeverk med app-konfigurasjon.
 */
export const { SøknadContextProvider, useSøknadContext } = createSøknadContext<Søknadsdata>({
    useStore: useSøknadStore as any, // Type assertion nødvendig pga generics
    stepConfig: søknadStepConfig,
    stepOrder: søknadStepOrder,
    stepTitles: stepTitles,
    formValuesToSøknadsdata,
    basePath: '/soknad',
});
