import { SamtykkeFormValues } from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { DeltBostedFormValues } from '../søknad/steps/delt-bosted/DeltBostedForm';
import { OmBarnetFormValues } from '../søknad/steps/om-barnet/OmBarnetStep';
import { OppsummeringFormValues } from '../søknad/steps/oppsummering/OppsummeringStep';

export interface StepFormValues {
    samtykke?: SamtykkeFormValues;
    omBarnet?: OmBarnetFormValues;
    deltBosted?: DeltBostedFormValues;
    oppsummering?: OppsummeringFormValues;
}
