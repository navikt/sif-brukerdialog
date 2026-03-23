import { YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum BostedFormFields {
    borITrondheim = 'borITrondheim',
}

export interface BostedFormValues extends StepFormValues {
    [BostedFormFields.borITrondheim]?: YesOrNo;
}
