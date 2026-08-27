import { BostedUtlandSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';

import { BostedUtlandFormValues } from './types';

export const toBostedUtlandStegFormValues = (
    søknadsdata: BostedUtlandSøknadsdata | undefined,
): Partial<BostedUtlandFormValues> => {
    if (søknadsdata?.harBoddINorge === undefined) return {};
    return {
        harBoddINorge: søknadsdata.harBoddINorge ? YesOrNo.YES : YesOrNo.NO,
        bosteder: søknadsdata.bosteder || [],
    };
};

export const toBostedUtlandStegSøknadsdata = (data: BostedUtlandFormValues): BostedUtlandSøknadsdata => {
    const harBoddINorge = data.harBoddINorge === YesOrNo.YES;
    return {
        harBoddINorge,
        bosteder: harBoddINorge === false ? data.bosteder : undefined,
    };
};
