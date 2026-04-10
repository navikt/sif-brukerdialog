import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

import { toBarnSøknadsdata } from '../steps/barn/barnStegUtils';
import { BarnFormValues } from '../steps/barn/types';
import { toBostedSøknadsdata } from '../steps/bosted/bostedStegUtils';
import { BostedFormValues } from '../steps/bosted/types';
import { toBostedUtlandStegSøknadsdata } from '../steps/bosted-utland/bostedUtlandStegUtils';
import { BostedUtlandFormValues } from '../steps/bosted-utland/types';
import { toKontonummerSøknadsdata } from '../steps/kontonummer/kontonummerStegUtils';
import { KontonummerFormValues } from '../steps/kontonummer/types';
import { toStartdatoSøknadsdata } from '../steps/startdato/startdatoStegUtils';
import { StartdatoFormValues } from '../steps/startdato/types';
import { toAndreYtelserSøknadsdata } from '../steps/andre-ytelser/andreYtelserStegUtils';
import { AndreYtelserFormValues } from '../steps/andre-ytelser/types';

export const formValuesToSøknadsdata = (stepId: string, formValues: StepFormValues): StepSøknadsdata | undefined => {
    switch (stepId) {
        case SøknadStepId.STARTDATO:
            return toStartdatoSøknadsdata(formValues as StartdatoFormValues);
        case SøknadStepId.ANDRE_YTELSER:
            return toAndreYtelserSøknadsdata(formValues as AndreYtelserFormValues);
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
