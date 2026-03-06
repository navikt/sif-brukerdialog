import { FormValues } from '@rammeverk/state/SøknadFormValuesContext';

import { SøknadStepId } from '../config/søknadStepConfig';
import { BarnFormValues } from '../steps/barn/BarnForm';
import { toBarnSøknadsdata } from '../steps/barn/barnStegUtils';
import { BostedFormValues } from '../steps/bosted/BostedForm';
import { toBostedSøknadsdata } from '../steps/bosted/bostedStegUtils';

export const formValuesToSøknadsdata = (
    stepId: string,
    formValues: FormValues,
): Record<string, unknown> | undefined => {
    switch (stepId) {
        case SøknadStepId.BARN:
            return toBarnSøknadsdata(formValues as BarnFormValues);
        case SøknadStepId.BOSTED:
            return toBostedSøknadsdata(formValues as BostedFormValues);
        default:
            return undefined;
    }
};
