import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/modules/samtykke-form/SamtykkeForm';
import { DineBarnFormValues } from '../søknad/steps/dine-barn/DineBarnStep';
import { FravaerFormValues } from '../søknad/steps/fravaer/FravaerStep';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { ArbeidssituasjonFormValues } from '../søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';
import { FravaerFraFormValues } from '../søknad/steps/fravaerFra/FravaerFraStep';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.DINE_BARN]?: DineBarnFormValues;
    [StepId.FRAVÆR]?: FravaerFormValues;
    [StepId.LEGEERKLÆRING]?: LegeerklæringFormValues;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonFormValues;
    [StepId.FRAVÆR_FRA]?: FravaerFraFormValues;
    [StepId.MEDLEMSKAP]?: MedlemskapFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
