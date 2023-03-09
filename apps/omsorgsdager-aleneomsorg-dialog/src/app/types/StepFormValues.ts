import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { OmOmsorgenForBarnFormValues } from '../søknad/steps/om-omsorgen-for-barn/OmOmsorgenForBarnStep';
import { TidspunktForAleneomsorgFormValues } from '../søknad/steps/tidspunkt-for-aleneomsorg/TidspunktForAleneomsorgStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';

export interface StepFormValues {
    samtykke?: SamtykkeFormValues;
    omOmsorgenForBarnFormValues?: OmOmsorgenForBarnFormValues;
    tidspunktForAleneomsorgFormValues?: TidspunktForAleneomsorgFormValues;
    oppsummering?: OppsummeringFormValues;
}
