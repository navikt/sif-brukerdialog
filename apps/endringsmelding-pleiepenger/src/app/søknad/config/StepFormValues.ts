import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { AktivitetFormValues } from '../steps/aktivitet/AktivitetStep';
import { ArbeidstidFormValues } from '../steps/arbeidstid/ArbeidstidStep';
import { OppsummeringFormValues } from '../steps/oppsummering/OppsummeringStep';

export interface StepFormValues {
    samtykke?: SamtykkeFormValues;
    aktivitet?: AktivitetFormValues;
    arbeidstid?: ArbeidstidFormValues;
    oppsummering?: OppsummeringFormValues;
}
