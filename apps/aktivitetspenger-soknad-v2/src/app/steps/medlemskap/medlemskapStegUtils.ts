import { YesOrNo } from '@sif/rhf';

import { MedlemskapSøknadsdata } from '../../types/Søknadsdata';
import { MedlemskapFormValues } from './MedlemskapForm';

export const toMedlemskapFormValues = (
    søknadsdata: MedlemskapSøknadsdata | undefined,
): Partial<MedlemskapFormValues> => {
    if (søknadsdata?.harBoddIUtlandetSiste5år === undefined) return {};
    return {
        harBoddIUtlandetSiste5år: søknadsdata.harBoddIUtlandetSiste5år ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toMedlemskapSøknadsdata = (data: MedlemskapFormValues): MedlemskapSøknadsdata => ({
    harBoddIUtlandetSiste5år: data.harBoddIUtlandetSiste5år === YesOrNo.YES,
});
