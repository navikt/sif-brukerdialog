import { MedlemskapSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';

import { MedlemskapFormValues } from './types';

export const toMedlemskapStegFormValues = (
    søknadsdata: MedlemskapSøknadsdata | undefined,
): Partial<MedlemskapFormValues> => {
    if (søknadsdata?.harBoddINorge === undefined) return {};
    return {
        harBoddINorge: søknadsdata.harBoddINorge ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toMedlemskapStegSøknadsdata = (data: MedlemskapFormValues): MedlemskapSøknadsdata => {
    const harBoddINorge = data.harBoddINorge === YesOrNo.YES;
    return {
        harBoddINorge: harBoddINorge,
    };
};
