import { YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum BarnFormFields {
    barnStemmer = 'barnStemmer',
}

export interface BarnFormValues extends StepFormValues {
    [BarnFormFields.barnStemmer]?: YesOrNo;
}
