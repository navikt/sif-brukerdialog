import { MedlemskapFormValues, SamtykkeFormValues } from '@navikt/sif-common-soknad-ds';
import { ArbeidssituasjonFormValues } from '../søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';
import { DineBarnFormValues } from '../søknad/steps/dine-barn/DineBarnStep';
import { FraværFraFormValues } from '../søknad/steps/fravær-fra/FraværFraStep';
import { FraværFormValues } from '../søknad/steps/fravær/FraværStep';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.DINE_BARN]?: DineBarnFormValues;
    [StepId.FRAVÆR]?: FraværFormValues;
    [StepId.LEGEERKLÆRING]?: LegeerklæringFormValues;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonFormValues;
    [StepId.FRAVÆR_FRA]?: FraværFraFormValues;
    [StepId.MEDLEMSKAP]?: MedlemskapFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
