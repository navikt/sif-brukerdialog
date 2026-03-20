import { YesOrNo } from '@sif/rhf';

import { KontonummerSøknadsdata } from '../../types/Søknadsdata';
import { KontonummerFormValues } from './KontonummerForm';

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
