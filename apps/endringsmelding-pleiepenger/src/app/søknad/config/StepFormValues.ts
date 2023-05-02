import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/modules/samtykke-form/SamtykkeForm';
import { ArbeidstidFormValues } from '../steps/arbeidstid/ArbeidstidStep';
import { LovbestemtFerieFormValues } from '../steps/lovbestemt-ferie/LovbestemtFerieStep';
import { OppsummeringFormValues } from '../steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.ARBEIDSTID]?: ArbeidstidFormValues;
    [StepId.LOVBESTEMT_FERIE]?: LovbestemtFerieFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.MELDING_SENDT]?: undefined;
}
