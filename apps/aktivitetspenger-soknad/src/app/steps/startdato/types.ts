import { StepFormValues } from '@sif/soknad/types';

export enum StartdatoFormFields {
    startdato = 'startdato',
}

export interface StartdatoFormValues extends StepFormValues {
    [StartdatoFormFields.startdato]?: string;
}
