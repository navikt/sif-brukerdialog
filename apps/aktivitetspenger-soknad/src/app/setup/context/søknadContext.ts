import { Søknadsdata } from '@app/types/Søknadsdata';
import { formValuesToSøknadsdata } from '@app/utils/formValuesToSøknadsdata';
import { createSøknadContext } from '@sif/soknad/context';

import { søknadStepConfig, søknadStepOrder, stepTitles } from '../config/søknadStepConfig';
import { SøknadStepId } from '../config/SøknadStepId';
import { useSøknadStore } from '../hooks/useSøknadStore';

export const { SøknadContextProvider, useSøknadsflyt } = createSøknadContext<Søknadsdata, SøknadStepId>({
    useStore: useSøknadStore as any,
    stepConfig: søknadStepConfig,
    stepOrder: søknadStepOrder,
    stepTitles: stepTitles,
    formValuesToSøknadsdata,
    getSøknadsdataForStep: (stepId, søknadsdata) => søknadsdata?.[stepId],
    basePath: '/soknad',
});
