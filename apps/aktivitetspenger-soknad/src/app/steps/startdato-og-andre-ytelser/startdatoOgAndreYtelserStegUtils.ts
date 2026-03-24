import { StartdatoOgAndreYtelserSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';

import { StartdatoOgAndreYtelserFormValues } from './types';

export const toStartdatoOgAndreYtelserFormValues = (
    søknadsdata: StartdatoOgAndreYtelserSøknadsdata | undefined,
): Partial<StartdatoOgAndreYtelserFormValues> => {
    if (søknadsdata?.harAndreYtelser === undefined) return {};
    return {
        harAndreYtelser: søknadsdata.harAndreYtelser ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toStartdatoOgAndreYtelserSøknadsdata = (
    data: StartdatoOgAndreYtelserFormValues,
): StartdatoOgAndreYtelserSøknadsdata => ({
    harAndreYtelser: data.harAndreYtelser === YesOrNo.YES,
});
