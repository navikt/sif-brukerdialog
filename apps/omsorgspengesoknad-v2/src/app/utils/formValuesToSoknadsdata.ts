import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

export const formValuesToSøknadsdata = (stepId: string, _formValues: StepFormValues): StepSøknadsdata | undefined => {
    switch (stepId) {
        case SøknadStepId.OM_BARNET:
            // TODO: implementeres i fase 5a
            return undefined;
        case SøknadStepId.LEGEERKLÆRING:
            // TODO: implementeres i fase 5b
            return undefined;
        case SøknadStepId.DELT_BOSTED:
            // TODO: implementeres i fase 5c
            return undefined;
        default:
            return undefined;
    }
};
