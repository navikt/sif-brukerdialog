import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { TidsromFormValues } from '../søknad/steps/tidsrom/TidsromStep';
import { ArbeidssituasjonFormValues } from '../søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';
import { ArbeidstidFormValues } from '../søknad/steps/arbeidstid/ArbeidstidStep';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';
import { OmBarnetFormValues } from '../søknad/steps/om-barnet/OmBarnetStep';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.OM_BARNET]?: OmBarnetFormValues;
    [StepId.LEGEERKLÆRING]?: LegeerklæringFormValues;
    [StepId.TIDSROM]?: TidsromFormValues;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonFormValues;
    [StepId.ARBEIDSTID]?: ArbeidstidFormValues;
    [StepId.MEDLEMSKAP]?: MedlemskapFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
