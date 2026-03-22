import { YesOrNo } from '@sif/rhf';

import { BostedUtlandSøknadsdata } from '../../types/Søknadsdata';
import { BostedUtlandFormValues } from './types';

export const toBostedUtlandStegFormValues = (
    søknadsdata: BostedUtlandSøknadsdata | undefined,
): Partial<BostedUtlandFormValues> => {
    if (søknadsdata?.harBoddIUtlandetSiste5år === undefined) return {};
    return {
        harBoddIUtlandetSiste5år: søknadsdata.harBoddIUtlandetSiste5år ? YesOrNo.YES : YesOrNo.NO,
        bosteder: søknadsdata.bosteder || [],
    };
};

export const toBostedUtlandStegSøknadsdata = (data: BostedUtlandFormValues): BostedUtlandSøknadsdata => {
    const harBoddIUtlandetSiste5år = data.harBoddIUtlandetSiste5år === YesOrNo.YES;
    return {
        harBoddIUtlandetSiste5år,
        bosteder: harBoddIUtlandetSiste5år ? data.bosteder : undefined,
    };
};
