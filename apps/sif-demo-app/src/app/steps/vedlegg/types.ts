import { UploadedFile } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum VedleggFormFields {
    vedlegg = 'vedlegg',
}

export interface VedleggFormValues extends StepFormValues {
    [VedleggFormFields.vedlegg]: UploadedFile[];
}