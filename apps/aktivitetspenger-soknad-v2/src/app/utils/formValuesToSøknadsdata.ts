import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

import { BarnFormValues } from '../steps/barn/BarnForm';
import { toBarnSøknadsdata } from '../steps/barn/barnStegUtils';
import { BostedFormValues } from '../steps/bosted/BostedForm';
import { toBostedSøknadsdata } from '../steps/bosted/bostedStegUtils';
import { BostedUtlandFormValues } from '../steps/bosted-utland/BostedUtlandForm';
import { toBostedUtlandStegSøknadsdata } from '../steps/bosted-utland/bostedUtlandStegUtils';
import { KontonummerFormValues } from '../steps/kontonummer/KontonummerForm';
import { toKontonummerSøknadsdata } from '../steps/kontonummer/kontonummerStegUtils';

export const formValuesToSøknadsdata = (stepId: string, formValues: StepFormValues): StepSøknadsdata | undefined => {
    switch (stepId) {
        case SøknadStepId.KONTONUMMER:
            return toKontonummerSøknadsdata(formValues as KontonummerFormValues);
        case SøknadStepId.BOSTED:
            return toBostedSøknadsdata(formValues as BostedFormValues);
        case SøknadStepId.BOSTED_UTLAND:
            return toBostedUtlandStegSøknadsdata(formValues as BostedUtlandFormValues);
        case SøknadStepId.BARN:
            return toBarnSøknadsdata(formValues as BarnFormValues);
        default:
            return undefined;
    }
};
