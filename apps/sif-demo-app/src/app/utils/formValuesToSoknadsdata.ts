import { SøknadStepId } from '@app/setup/config/soknadStepConfig';
import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

import { BarnFormValues } from '../steps/barn/BarnForm';
import { toBarnSøknadsdata } from '../steps/barn/barnStegUtils';
import { BostedFormValues } from '../steps/bosted/BostedForm';
import { toBostedSøknadsdata } from '../steps/bosted/bostedStegUtils';

export const formValuesToSøknadsdata = (stepId: string, formValues: StepFormValues): StepSøknadsdata | undefined => {
    switch (stepId) {
        case SøknadStepId.BARN:
            return toBarnSøknadsdata(formValues as BarnFormValues);
        case SøknadStepId.BOSTED:
            return toBostedSøknadsdata(formValues as BostedFormValues);
        default:
            return undefined;
    }
};
