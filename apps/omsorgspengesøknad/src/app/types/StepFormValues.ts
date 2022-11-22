import { VelkommenFormValues } from '../pages/velkommen/VelkommenPage';
import { DeltBostedFormValues } from '../søknad/steps/delt-bosted/DeltBostedStep';
import { OmBarnetFormValues } from '../søknad/steps/om-barnet/OmBarnetStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';

export interface StepFormValues {
    velkommen?: VelkommenFormValues;
    omBarnet?: OmBarnetFormValues;
    deltBosted?: DeltBostedFormValues;
    oppsummering?: OppsummeringFormValues;
}
