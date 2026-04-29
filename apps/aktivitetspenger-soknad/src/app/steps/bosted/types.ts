import { YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum BostedFormFields {
    erBosattITrondheim = 'erBosattITrondheim',
}

export interface BostedFormValues extends StepFormValues {
    [BostedFormFields.erBosattITrondheim]?: YesOrNo;
}
