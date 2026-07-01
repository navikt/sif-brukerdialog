import { YesOrNo } from '@sif/rhf';

export enum KontonummerFormFields {
    kontonummerErRiktig = 'kontonummerErRiktig',
}

export interface KontonummerFormValues {
    [KontonummerFormFields.kontonummerErRiktig]?: YesOrNo;
}
