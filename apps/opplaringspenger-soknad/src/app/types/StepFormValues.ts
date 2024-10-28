import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds';
import { ArbeidssituasjonFormValues } from '../søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';
import { KursFormValues } from '../søknad/steps/kurs/KursStep';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapStep';
import { OmBarnetFormValues } from '../søknad/steps/om-barnet/om-barnet-form/types';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.OM_BARNET]?: OmBarnetFormValues;
    [StepId.LEGEERKLÆRING]?: LegeerklæringFormValues;
    [StepId.KURS]?: KursFormValues;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonFormValues;
    [StepId.MEDLEMSKAP]?: MedlemskapFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
