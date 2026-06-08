import { Søknadsdata } from '@app/types/Soknadsdata';
import { formValuesToSøknadsdata } from '@app/utils/formValuesToSoknadsdata';
import { createSøknadContext } from '@sif/soknad/context';

import { søknadStepConfig, søknadStepOrder } from '../config/soknadStepConfig';
import { SøknadStepId } from '../config/SoknadStepId';
import { useSøknadStore } from '../hooks/useSoknadStore';

export const { SøknadContextProvider, useSøknadsflyt } = createSøknadContext<Søknadsdata, SøknadStepId>({
    useStore: useSøknadStore as any,
    stepConfig: søknadStepConfig,
    stepOrder: søknadStepOrder,
    formValuesToSøknadsdata,
    getSøknadsdataForStep: (stepId, søknadsdata) => søknadsdata?.[stepId],
    basePath: '/soknad',
});
