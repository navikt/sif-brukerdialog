import { SøknadStepId } from '@app/setup/config/SoknadStepId';

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

/**
 * Konverterer lagrede RHF-skjemaverdier til søknadsdata-format per steg.
 * Brukes av @sif/soknad-app for å oppdage ulagrede endringer (browser back/forward).
 */
export const formValuesToSøknadsdata = (
    stepId: string,
    formValues: Record<string, unknown>,
): Record<string, unknown> | undefined => {
    switch (stepId) {
        case SøknadStepId.STARTDATO:
            return toStartdatoSøknadsdata(formValues as StartdatoFormValues) as Record<string, unknown>;
        case SøknadStepId.KONTONUMMER:
            return toKontonummerSøknadsdata(formValues as KontonummerFormValues) as Record<string, unknown>;
        case SøknadStepId.BOSTED:
            return toBostedSøknadsdata(formValues as BostedFormValues) as Record<string, unknown>;
        case SøknadStepId.BOSTED_UTLAND:
            return toBostedUtlandStegSøknadsdata(formValues as BostedUtlandFormValues) as Record<string, unknown>;
        case SøknadStepId.BARN:
            return toBarnSøknadsdata(formValues as BarnFormValues) as Record<string, unknown>;
        default:
            return undefined;
    }
};
