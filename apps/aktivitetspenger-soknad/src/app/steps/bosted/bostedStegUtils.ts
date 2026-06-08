import { BostedSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';

import { BostedFormValues } from './types';

export const toBostedFormValues = (søknadsdata: BostedSøknadsdata | undefined): Partial<BostedFormValues> => {
    if (søknadsdata?.erBosattITrondheim === undefined) return {};
    return {
        erBosattITrondheim: søknadsdata.erBosattITrondheim ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toBostedSøknadsdata = (data: BostedFormValues): BostedSøknadsdata => ({
    erBosattITrondheim: data.erBosattITrondheim === YesOrNo.YES,
});
