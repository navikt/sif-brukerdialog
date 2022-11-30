import { VelkommenFormValues } from '../../pages/velkommen/VelkommenPage';
import { AktivitetFormValues } from '../steps/aktivitet/AktivitetStep';
import { ArbeidstidFormValues } from '../steps/arbeidstid/ArbeidstidStep';
import { OppsummeringFormValues } from '../steps/oppsummering/OppsummeringStep';

export interface StepFormValues {
    velkommen?: VelkommenFormValues;
    aktivitet?: AktivitetFormValues;
    arbeidstid?: ArbeidstidFormValues;
    oppsummering?: OppsummeringFormValues;
}
