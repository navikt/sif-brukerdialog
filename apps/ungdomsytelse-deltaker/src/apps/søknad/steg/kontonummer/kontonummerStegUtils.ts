import { YesOrNo } from '@sif/rhf';

import { KontonummerSøknadsdata } from '../../setup/types/Søknadsdata';
import { KontonummerFormValues } from './types';

export const toKontonummerFormValues = (
    søknadsdata: KontonummerSøknadsdata | undefined,
): Partial<KontonummerFormValues> => {
    if (!søknadsdata) return {};
    return { kontonummerErRiktig: søknadsdata.kontonummerErRiktig };
};

export const toKontonummerSøknadsdata = (values: KontonummerFormValues): KontonummerSøknadsdata => ({
    kontonummerErRiktig: values.kontonummerErRiktig as YesOrNo | undefined,
});
