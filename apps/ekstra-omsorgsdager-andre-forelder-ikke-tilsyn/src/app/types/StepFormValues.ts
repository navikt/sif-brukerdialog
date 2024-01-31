import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds';
import { AnnenForelderenSituasjonFormValues } from '../søknad/steps/annen-forelderens-situasjon/AnnenForelderenSituasjonStep';
import { OmAnnenForelderFormValues } from '../søknad/steps/om-annen-forelder/OmAnnenForelderStep';
import { OmBarnaFormValues } from '../søknad/steps/om-barna/OmBarnaStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';
import { StepId } from './StepId';

export interface StepFormValues {
    [StepId.VELKOMMEN]?: SamtykkeFormValues;
    [StepId.OM_ANNEN_FORELDER]?: OmAnnenForelderFormValues;
    [StepId.ANNEN_FORELDER_SITUASJON]?: AnnenForelderenSituasjonFormValues;
    [StepId.OM_BARNA]?: OmBarnaFormValues;
    [StepId.OPPSUMMERING]?: OppsummeringFormValues;
    [StepId.KVITTERING]?: undefined;
}
