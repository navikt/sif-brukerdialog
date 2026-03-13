import { createSøknadContext } from '@sif/soknad/context';

import { søknadStepConfig, søknadStepOrder, stepTitles } from '../config/søknadStepConfig';
import { useSøknadStore } from '../hooks/useSøknadStore';
import { Søknadsdata } from '../types/Søknadsdata';
import { formValuesToSøknadsdata } from '../utils/formValuesToSøknadsdata';

/**
 * App-spesifikk SøknadContext.
 * Kobler sammen rammeverk med app-konfigurasjon.
 */
export const { SøknadContextProvider, useSøknadContext } = createSøknadContext<Søknadsdata>({
    useStore: useSøknadStore as any, // Type assertion nødvendig pga generics
    stepConfig: søknadStepConfig,
    stepOrder: søknadStepOrder,
    stepTitles,
    formValuesToSøknadsdata,
    basePath: '/soknad',
});
