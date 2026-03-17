import { YesOrNo } from '@navikt/sif-common-formik-ds';

import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { BostedFormValues } from './BostedForm';

export const toBostedFormValues = (søknadsdata: BostedSøknadsdata): BostedFormValues => {
    if (søknadsdata?.borITrondheim === undefined) {
        return {};
    }
    return {
        borITrondheim: søknadsdata.borITrondheim ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toBostedSøknadsdata = (data: BostedFormValues): BostedSøknadsdata => ({
    borITrondheim: data.borITrondheim === YesOrNo.YES,
});
