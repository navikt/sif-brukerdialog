import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { ArbeidstidFormValues } from '../steps/arbeidstid/ArbeidstidStep';
import { LovbestemtFerieFormValues } from '../steps/lovbestemt-ferie/LovbestemtFerieStep';
import { OppsummeringFormValues } from '../steps/oppsummering/OppsummeringStep';

export interface StepFormValues {
    samtykke?: SamtykkeFormValues;
    arbeidstid?: ArbeidstidFormValues;
    lovbestemtFerie?: LovbestemtFerieFormValues;
    oppsummering?: OppsummeringFormValues;
}
