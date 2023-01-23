import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { OmBarnetFormValues } from '../søknad/steps/om-barnet/OmBarnetStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';

export interface StepFormValues {
    samtykke?: SamtykkeFormValues;
    omBarnet?: OmBarnetFormValues;
    oppsummering?: OppsummeringFormValues;
}
