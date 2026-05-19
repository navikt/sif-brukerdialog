import { YesOrNo } from '@sif/rhf';

import { BostedSøknadsdata } from '../../types/Soknadsdata';
import { BostedFormValues } from './BostedForm';

export const toBostedFormValues = (søknadsdata: BostedSøknadsdata): BostedFormValues => {
    if (søknadsdata?.erBosattITrondheim === undefined) {
        return {};
    }
    return {
        erBosattITrondheim: søknadsdata.erBosattITrondheim ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toBostedSøknadsdata = (data: BostedFormValues): BostedSøknadsdata => ({
    erBosattITrondheim: data.erBosattITrondheim === YesOrNo.YES,
});
