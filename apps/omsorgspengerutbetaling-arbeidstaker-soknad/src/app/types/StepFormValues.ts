import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds';
import { MedlemskapFormValues } from '@navikt/sif-common-forms-ds';
import { DineBarnFormValues } from '../søknad/steps/dine-barn/DineBarnStep';
import { FraværStepFormValues } from '../søknad/steps/fravær/FraværStep';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { SituasjonFormValues } from '../søknad/steps/situasjon/SituasjonStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.DINE_BARN]?: DineBarnFormValues;
    [StepId.SITUASJON]?: SituasjonFormValues;
    [StepId.FRAVÆR]?: FraværStepFormValues;
    [StepId.LEGEERKLÆRING]?: LegeerklæringFormValues;
    [StepId.MEDLEMSKAP]?: MedlemskapFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
