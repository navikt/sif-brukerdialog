import { YesOrNo } from '@sif/rhf';

export enum BostedFormFields {
    erBosattITrondheim = 'erBosattITrondheim',
    borUtenforTrondheim = 'borUtenforTrondheim',
}

export type BostedFormValues = {
    [BostedFormFields.erBosattITrondheim]?: YesOrNo;
    [BostedFormFields.borUtenforTrondheim]?: YesOrNo;
};
