import { UploadedFile } from '@sif/rhf';

export enum VedleggFormFields {
    vedlegg = 'vedlegg',
}

export type VedleggFormValues = {
    [VedleggFormFields.vedlegg]: UploadedFile[];
};