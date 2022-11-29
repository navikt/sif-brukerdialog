import { VelkommenFormValues } from '../pages/velkommen/VelkommenPage';
import { ArbeidstidFormValues } from '../søknad/steps/arbeidstid/ArbeidstidStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';

export interface StepFormValues {
    velkommen?: VelkommenFormValues;
    arbeidstid?: ArbeidstidFormValues;
    oppsummering?: OppsummeringFormValues;
}
