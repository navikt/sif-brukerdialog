import { YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';
import { BostedUtland } from '@sif/soknad-forms';

export enum BostedUtlandFormFields {
    harBoddIUtlandetSiste5år = 'harBoddIUtlandetSiste5år',
    bosteder = 'bosteder',
}

export interface BostedUtlandFormValues extends StepFormValues {
    [BostedUtlandFormFields.harBoddIUtlandetSiste5år]?: YesOrNo;
    [BostedUtlandFormFields.bosteder]?: BostedUtland[];
}
