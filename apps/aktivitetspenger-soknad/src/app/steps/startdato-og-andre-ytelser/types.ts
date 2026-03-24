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

export enum StartdatoOgAndreYtelserFormFields {
    harAndreYtelser = 'harAndreYtelser',
    andreYtelser = 'andreYtelser',
}

export interface StartdatoOgAndreYtelserFormValues extends StepFormValues {
    [StartdatoOgAndreYtelserFormFields.harAndreYtelser]?: YesOrNo;
    [StartdatoOgAndreYtelserFormFields.andreYtelser]?: AndreYtelse[];
}
