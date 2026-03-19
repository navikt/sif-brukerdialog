import { YesOrNo } from '@sif/rhf';

import { KontonummerSøknadsdata } from '../../types/Søknadsdata';
import { KontonummerFormValues } from './KontonummerForm';

export const toKontonummerFormValues = (
    søknadsdata: KontonummerSøknadsdata | undefined,
): Partial<KontonummerFormValues> => {
    if (søknadsdata?.harKontonummer === undefined) return {};
    return {
        harKontonummer: søknadsdata.harKontonummer ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toKontonummerSøknadsdata = (data: KontonummerFormValues): KontonummerSøknadsdata => ({
    harKontonummer: data.harKontonummer === YesOrNo.YES,
});
