import { YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum KontonummerFormFields {
    kontonummerErRiktig = 'kontonummerErRiktig',
}

export interface KontonummerFormValues extends StepFormValues {
    [KontonummerFormFields.kontonummerErRiktig]?: YesOrNo;
}
