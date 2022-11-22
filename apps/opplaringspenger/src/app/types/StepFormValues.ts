import { VelkommenFormValues } from '../pages/velkommen/VelkommenPage';
import { ArbeidFormValues } from '../søknad/steps/arbeid/ArbeidStep';
import { InstitusjonFormValues } from '../søknad/steps/institusjon/InstitusjonStep';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapStep';
import { OpplæringFormValues } from '../søknad/steps/opplæring/OpplæringStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { PleietrengendeFormValues } from '../søknad/steps/pleietrengende/PleietrengendeStep';

export interface StepFormValues {
    velkommen?: VelkommenFormValues;
    pleietrengende?: PleietrengendeFormValues;
    institusjon?: InstitusjonFormValues;
    arbeid?: ArbeidFormValues;
    opplaring?: OpplæringFormValues;
    medlemskap?: MedlemskapFormValues;
    oppsummering?: OppsummeringFormValues;
}
