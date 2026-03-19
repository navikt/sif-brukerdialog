import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

import { BarnFormValues } from '../steps/barn/BarnForm';
import { toBarnSøknadsdata } from '../steps/barn/barnStegUtils';
import { BostedFormValues } from '../steps/bosted/BostedForm';
import { toBostedSøknadsdata } from '../steps/bosted/bostedStegUtils';
import { KontonummerFormValues } from '../steps/kontonummer/KontonummerForm';
import { toKontonummerSøknadsdata } from '../steps/kontonummer/kontonummerStegUtils';
import { MedlemskapFormValues } from '../steps/medlemskap/MedlemskapForm';
import { toMedlemskapSøknadsdata } from '../steps/medlemskap/medlemskapStegUtils';

export const formValuesToSøknadsdata = (stepId: string, formValues: StepFormValues): StepSøknadsdata | undefined => {
    switch (stepId) {
        case SøknadStepId.KONTONUMMER:
            return toKontonummerSøknadsdata(formValues as KontonummerFormValues);
        case SøknadStepId.BOSTED:
            return toBostedSøknadsdata(formValues as BostedFormValues);
        case SøknadStepId.MEDLEMSKAP:
            return toMedlemskapSøknadsdata(formValues as MedlemskapFormValues);
        case SøknadStepId.BARN:
            return toBarnSøknadsdata(formValues as BarnFormValues);
        default:
            return undefined;
    }
};
