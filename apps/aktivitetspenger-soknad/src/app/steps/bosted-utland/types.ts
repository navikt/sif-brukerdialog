import { YesOrNo } from '@sif/rhf';
import { BostedUtland } from '@sif/soknad-forms';

export enum BostedUtlandFormFields {
    harBoddINorge = 'harBoddINorge',
    bosteder = 'bosteder',
}

export interface BostedUtlandFormValues {
    [BostedUtlandFormFields.harBoddINorge]?: YesOrNo;
    [BostedUtlandFormFields.bosteder]?: BostedUtland[];
}
