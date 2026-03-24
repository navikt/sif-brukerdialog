import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

import { toBarnSøknadsdata } from '../steps/barn/barnStegUtils';
import { BarnFormValues } from '../steps/barn/types';
import { toStartdatoOgAndreYtelserSøknadsdata } from '../steps/startdato-og-andre-ytelser/startdatoOgAndreYtelserStegUtils';
import { StartdatoOgAndreYtelserFormValues } from '../steps/startdato-og-andre-ytelser/types';
import { toBostedSøknadsdata } from '../steps/bosted/bostedStegUtils';
import { BostedFormValues } from '../steps/bosted/types';
import { toBostedUtlandStegSøknadsdata } from '../steps/bosted-utland/bostedUtlandStegUtils';
import { BostedUtlandFormValues } from '../steps/bosted-utland/types';
import { toKontonummerSøknadsdata } from '../steps/kontonummer/kontonummerStegUtils';
import { KontonummerFormValues } from '../steps/kontonummer/types';

export const formValuesToSøknadsdata = (stepId: string, formValues: StepFormValues): StepSøknadsdata | undefined => {
    switch (stepId) {
        case SøknadStepId.STARTDATO_OG_ANDRE_YTELSER:
            return toStartdatoOgAndreYtelserSøknadsdata(formValues as StartdatoOgAndreYtelserFormValues);
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
