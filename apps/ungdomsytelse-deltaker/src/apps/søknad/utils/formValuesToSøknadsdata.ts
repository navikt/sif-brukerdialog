import { StepFormValues } from '@sif/soknad/types';

import { SøknadStepId } from '../setup/config/SøknadStepId';
import { BarnSøknadsdata, KontonummerSøknadsdata, Søknadsdata } from '../setup/types/Søknadsdata';
import { BarnFormValues } from '../steg/barn/types';
import { KontonummerFormValues } from '../steg/kontonummer/types';

export const formValuesToSøknadsdata = (
    stepId: SøknadStepId,
    formValues: StepFormValues,
): Partial<Søknadsdata> | undefined => {
    switch (stepId) {
        case SøknadStepId.KONTONUMMER: {
            const { kontonummerErRiktig } = formValues as KontonummerFormValues;
            const søknadsdata: KontonummerSøknadsdata = { kontonummerErRiktig };
            return { [SøknadStepId.KONTONUMMER]: søknadsdata };
        }
        case SøknadStepId.BARN: {
            const { barnStemmer } = formValues as BarnFormValues;
            if (!barnStemmer) return undefined;
            const søknadsdata: BarnSøknadsdata = { barnStemmer };
            return { [SøknadStepId.BARN]: søknadsdata };
        }
        default:
            return undefined;
    }
};
