import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/src/modules/samtykke-form/SamtykkeForm';
import { DeltBostedFormValues } from '../søknad/steps/delt-bosted/DeltBostedForm';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { OmBarnetFormValues } from '../søknad/steps/om-barnet/OmBarnetStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.OM_BARNET]?: OmBarnetFormValues;
    [StepId.DELT_BOSTED]?: DeltBostedFormValues;
    [StepId.LEGEERKLÆRING]?: LegeerklæringFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
