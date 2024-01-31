import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds';
import { OmOmsorgenForBarnFormValues } from '../søknad/steps/om-omsorgen-for-barn/OmOmsorgenForBarnStep';
import { TidspunktForAleneomsorgFormValues } from '../søknad/steps/tidspunkt-for-aleneomsorg/TidspunktForAleneomsorgStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.OM_OMSORGEN_FOR_BARN]?: OmOmsorgenForBarnFormValues;
    [StepId.TIDSPUNKT_FOR_ALENEOMSORG]?: TidspunktForAleneomsorgFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
