import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

import { SøknadStepId } from '../setup/config/SøknadStepId';
import { BarnSøknadsdata, KontonummerSøknadsdata } from '../setup/types/Søknadsdata';
import { BarnFormValues } from '../steg/barn/types';
import { KontonummerFormValues } from '../steg/kontonummer/types';

export const formValuesToSøknadsdata = (
    stepId: SøknadStepId,
    formValues: StepFormValues,
): StepSøknadsdata | undefined => {
    switch (stepId) {
        case SøknadStepId.KONTONUMMER: {
            const { kontonummerErRiktig } = formValues as KontonummerFormValues;
            const søknadsdata: KontonummerSøknadsdata = { kontonummerErRiktig };
            return søknadsdata;
        }
        case SøknadStepId.BARN: {
            const { barnStemmer } = formValues as BarnFormValues;
            if (!barnStemmer) return undefined;
            const søknadsdata: BarnSøknadsdata = { barnStemmer };
            return søknadsdata;
        }
        default:
            return undefined;
    }
};
