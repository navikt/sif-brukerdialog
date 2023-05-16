import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/modules/samtykke-form/SamtykkeForm';
import { ArbeidssituasjonFormValues } from '../steps/arbeidssituasjon/ArbeidssituasjonStep';
import { ArbeidstidFormValues } from '../steps/arbeidstid/ArbeidstidForm';
import { LovbestemtFerieFormValues } from '../steps/lovbestemt-ferie/LovbestemtFerieStep';
import { OppsummeringFormValues } from '../steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonFormValues;
    [StepId.ARBEIDSTID]?: ArbeidstidFormValues;
    [StepId.LOVBESTEMT_FERIE]?: LovbestemtFerieFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.MELDING_SENDT]?: undefined;
}
