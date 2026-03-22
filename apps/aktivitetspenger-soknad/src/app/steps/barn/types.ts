import { YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum BarnFormFields {
    informasjonStemmer = 'informasjonStemmer',
}

export interface BarnFormValues extends StepFormValues {
    [BarnFormFields.informasjonStemmer]?: YesOrNo;
}
