import { YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum StartdatoOgAndreYtelserFormFields {
    harAndreYtelser = 'harAndreYtelser',
}

export interface StartdatoOgAndreYtelserFormValues extends StepFormValues {
    [StartdatoOgAndreYtelserFormFields.harAndreYtelser]?: YesOrNo;
}
