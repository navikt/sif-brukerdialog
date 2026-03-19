import { YesOrNo } from '@sif/rhf';

import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { BostedFormValues } from './BostedForm';

export const toBostedFormValues = (søknadsdata: BostedSøknadsdata | undefined): Partial<BostedFormValues> => {
    if (søknadsdata?.borINorge === undefined) return {};
    return {
        borINorge: søknadsdata.borINorge ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toBostedSøknadsdata = (data: BostedFormValues): BostedSøknadsdata => ({
    borINorge: data.borINorge === YesOrNo.YES,
});
