import { YesOrNo } from '@sif/rhf';

import { KontonummerSøknadsdata } from '../../types/Søknadsdata';
import { KontonummerFormValues } from './KontonummerForm';

export const toKontonummerFormValues = (
    søknadsdata: KontonummerSøknadsdata | undefined,
): Partial<KontonummerFormValues> => {
    if (søknadsdata?.kontonummerStemmer === undefined) return {};
    return {
        kontonummerErRiktig: søknadsdata.kontonummerStemmer ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toKontonummerSøknadsdata = (data: KontonummerFormValues): KontonummerSøknadsdata => ({
    kontonummerStemmer: data.kontonummerErRiktig === YesOrNo.YES,
});
