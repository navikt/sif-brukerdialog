import { YesOrNo } from '@sif/rhf';

export enum BarnFormFields {
    informasjonStemmer = 'informasjonStemmer',
}

export interface BarnFormValues {
    [BarnFormFields.informasjonStemmer]?: YesOrNo;
}
