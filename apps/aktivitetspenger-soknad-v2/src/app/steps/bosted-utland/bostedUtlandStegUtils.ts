import { YesOrNo } from '@sif/rhf';

import { BostedUtlandSøknadsdata } from '../../types/Søknadsdata';
import { BostedUtlandFormValues } from './BostedUtlandForm';

export const toBostedUtlandStegFormValues = (
    søknadsdata: BostedUtlandSøknadsdata | undefined,
): Partial<BostedUtlandFormValues> => {
    if (søknadsdata?.harBoddIUtlandetSiste5år === undefined) return {};
    return {
        harBoddIUtlandetSiste5år: søknadsdata.harBoddIUtlandetSiste5år ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toBostedUtlandStegSøknadsdata = (data: BostedUtlandFormValues): BostedUtlandSøknadsdata => ({
    harBoddIUtlandetSiste5år: data.harBoddIUtlandetSiste5år === YesOrNo.YES,
    bosteder: data.bosteder || [],
});
