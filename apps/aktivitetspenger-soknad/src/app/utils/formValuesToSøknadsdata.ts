import { SøknadStepId } from '@app/types/SoknadStepId';

import { toBarnSøknadsdata } from '../steps/barn/barnStegUtils';
import { BarnFormValues } from '../steps/barn/types';
import { toBostedSøknadsdata } from '../steps/bosted/bostedStegUtils';
import { BostedFormValues } from '../steps/bosted/types';
import { toMedlemskapStegSøknadsdata } from '../steps/medlemskap/medlemskapStegUtils';
import { MedlemskapFormValues } from '../steps/medlemskap/types';
import { toKontonummerSøknadsdata } from '../steps/kontonummer/kontonummerStegUtils';
import { KontonummerFormValues } from '../steps/kontonummer/types';

/**
 * Konverterer lagrede RHF-skjemaverdier til søknadsdata-format per steg.
 * Brukes av @sif/soknad-app for å oppdage ulagrede endringer (browser back/forward).
 */
export const formValuesToSøknadsdata = (
    stepId: string,
    formValues: Record<string, unknown>,
): Record<string, unknown> | undefined => {
    switch (stepId) {
        case SøknadStepId.KONTONUMMER:
            return toKontonummerSøknadsdata(formValues as KontonummerFormValues) as Record<string, unknown>;
        case SøknadStepId.BOSTED:
            return toBostedSøknadsdata(formValues as BostedFormValues) as Record<string, unknown>;
        case SøknadStepId.BOSTED_UTLAND:
            return toMedlemskapStegSøknadsdata(formValues as MedlemskapFormValues) as Record<string, unknown>;
        case SøknadStepId.BARN:
            return toBarnSøknadsdata(formValues as BarnFormValues) as Record<string, unknown>;
        default:
            return undefined;
    }
};
