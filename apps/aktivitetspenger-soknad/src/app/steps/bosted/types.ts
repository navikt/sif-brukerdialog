import { YesOrNo } from '@sif/rhf';

export enum BostedFormFields {
    erBosattITrondheim = 'erBosattITrondheim',
}

export interface BostedFormValues {
    [BostedFormFields.erBosattITrondheim]?: YesOrNo;
}
