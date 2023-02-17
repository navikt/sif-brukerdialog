import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { AnnenForelderenSituasjonFormValues } from '../søknad/steps/annen-forelderens-situasjon/AnnenForelderenSituasjonStep';
import { OmAnnenForelderFormValues } from '../søknad/steps/om-annen-forelder/OmAnnenForelderStep';
import { OmBarnaFormValues } from '../søknad/steps/om-barna/OmBarnaStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';

export interface StepFormValues {
    samtykke?: SamtykkeFormValues;
    omAnnenForelderFormValues?: OmAnnenForelderFormValues;
    annenForelderenSituasjonFormValues?: AnnenForelderenSituasjonFormValues;
    omBarna?: OmBarnaFormValues;
    oppsummering?: OppsummeringFormValues;
}
