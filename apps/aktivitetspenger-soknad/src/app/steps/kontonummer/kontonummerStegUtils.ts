import { KontonummerSøknadsdata } from '@app/types/Søknadsdata';
import { YesOrNo } from '@sif/rhf';

import { KontonummerFormValues } from './types';

export const toKontonummerFormValues = (
    søknadsdata: KontonummerSøknadsdata | undefined,
): Partial<KontonummerFormValues> => {
    if (søknadsdata?.kontonummerErRiktig === undefined) return {};
    return {
        kontonummerErRiktig: søknadsdata.kontonummerErRiktig ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toKontonummerSøknadsdata = (data: KontonummerFormValues): KontonummerSøknadsdata => ({
    kontonummerErRiktig: data.kontonummerErRiktig === YesOrNo.YES,
});
