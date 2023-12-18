import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/src/modules/samtykke-form/SamtykkeForm';
import { ArbeidstidFormValues } from '../steps/arbeidstid/ArbeidstidForm';
import { LovbestemtFerieFormValues } from '../steps/lovbestemt-ferie/LovbestemtFerieStep';
import { OppsummeringFormValues } from '../steps/oppsummering/OppsummeringStep';
import { UkjentArbeidsforholdFormValues } from '../steps/ukjent-arbeidsforhold/UkjentArbeidsforholdForm';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.UKJENT_ARBEIDSFOHOLD]?: UkjentArbeidsforholdFormValues;
    [StepId.ARBEIDSTID]?: ArbeidstidFormValues;
    [StepId.LOVBESTEMT_FERIE]?: LovbestemtFerieFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.MELDING_SENDT]?: undefined;
}
