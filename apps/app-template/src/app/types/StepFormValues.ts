import { VelkommenFormValues } from '../pages/velkommen/VelkommenPage';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapForm';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { PleietrengendeFormValues } from '../søknad/steps/pleietrengende/PleietrengendeStep';

export interface StepFormValues {
    velkommen?: VelkommenFormValues;
    pleietrengende?: PleietrengendeFormValues;
    medlemskap?: MedlemskapFormValues;
    oppsummering?: OppsummeringFormValues;
}
