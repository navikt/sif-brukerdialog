import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/src/modules/samtykke-form/SamtykkeForm';
import { StepId } from './StepId';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { SituasjonFormValues } from '../søknad/steps/situasjon/SituasjonStep';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapStep';
import { FraværStepFormValues } from '../søknad/steps/fravær/FraværStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { FosterbarnFormValues } from '../søknad/steps/fosterbarn/FosterbarnStep';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.FOSTERBARN]?: FosterbarnFormValues;
    [StepId.SITUASJON]?: SituasjonFormValues;
    [StepId.FRAVÆR]?: FraværStepFormValues;
    [StepId.LEGEERKLÆRING]?: LegeerklæringFormValues;
    [StepId.MEDLEMSKAP]?: MedlemskapFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
