import { UploadedFile } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum DeltBostedFormFields {
    samværsavtale = 'samværsavtale',
}

export interface DeltBostedFormValues extends StepFormValues {
    [DeltBostedFormFields.samværsavtale]: UploadedFile[];
}
