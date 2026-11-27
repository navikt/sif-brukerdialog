import { SøknadStepId } from '../types/SoknadStepId';

export const formValuesToSøknadsdata = (stepId: string): Record<string, unknown> | undefined => {
    if (stepId === SøknadStepId.OM_OMSORGEN_FOR_BARN || stepId === SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG) {
        return { mock: true };
    }

    return undefined;
};
