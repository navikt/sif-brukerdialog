import { BostedSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';

import { BostedFormValues } from './types';

export const toBostedFormValues = (søknadsdata: BostedSøknadsdata | undefined): Partial<BostedFormValues> => {
    if (søknadsdata?.borITrondheim === undefined) return {};
    return {
        borITrondheim: søknadsdata.borITrondheim ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toBostedSøknadsdata = (data: BostedFormValues): BostedSøknadsdata => ({
    borITrondheim: data.borITrondheim === YesOrNo.YES,
});
