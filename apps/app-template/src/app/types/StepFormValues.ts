import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapForm';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { PleietrengendeFormValues } from '../søknad/steps/pleietrengende/PleietrengendeStep';

export interface StepFormValues {
    samtykke?: SamtykkeFormValues;
    pleietrengende?: PleietrengendeFormValues;
    medlemskap?: MedlemskapFormValues;
    oppsummering?: OppsummeringFormValues;
}
