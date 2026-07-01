import { YesOrNo } from '@sif/rhf';
import { BostedUtland } from '@sif/soknad-forms';

export enum BostedUtlandFormFields {
    harBoddIUtlandetSiste5år = 'harBoddIUtlandetSiste5år',
    bosteder = 'bosteder',
}

export interface BostedUtlandFormValues {
    [BostedUtlandFormFields.harBoddIUtlandetSiste5år]?: YesOrNo;
    [BostedUtlandFormFields.bosteder]?: BostedUtland[];
}
