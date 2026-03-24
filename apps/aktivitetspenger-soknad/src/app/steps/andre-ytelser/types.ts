import { YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum AndreYtelse {
    OKONOMISK_SOSIALHJELP = 'OKONOMISK_SOSIALHJELP',
    ARBEIDSAVKLARINGSPENGER = 'ARBEIDSAVKLARINGSPENGER',
    TILTAKSPENGER = 'TILTAKSPENGER',
    DAGPENGER = 'DAGPENGER',
    SYKEPENGER = 'SYKEPENGER',
    PLEIE_ELLER_OPPLARINGSPENGER = 'PLEIE_ELLER_OPPLARINGSPENGER',
    ANNET = 'ANNET',
}

export enum AndreYtelserFormFields {
    harAndreYtelser = 'harAndreYtelser',
    andreYtelser = 'andreYtelser',
}

export interface AndreYtelserFormValues extends StepFormValues {
    [AndreYtelserFormFields.harAndreYtelser]?: YesOrNo;
    [AndreYtelserFormFields.andreYtelser]?: AndreYtelse[];
}
