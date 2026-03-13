import { søknadStepConfig, søknadStepOrder, stepTitles } from '@app/setup';
import { createSøknadContext } from '@sif/soknad/context';

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
    stepTitles: stepTitles,
    formValuesToSøknadsdata,
    basePath: '/soknad',
});
