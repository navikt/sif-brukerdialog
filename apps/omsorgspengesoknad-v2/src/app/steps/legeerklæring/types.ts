import { UploadedFile } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum LegeerklæringFormFields {
    vedlegg = 'vedlegg',
}

export interface LegeerklæringFormValues extends StepFormValues {
    [LegeerklæringFormFields.vedlegg]: UploadedFile[];
}
