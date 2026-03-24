import { StartdatoOgAndreYtelserSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';

import { AndreYtelse, StartdatoOgAndreYtelserFormValues } from './types';

export const toStartdatoOgAndreYtelserFormValues = (
    søknadsdata: StartdatoOgAndreYtelserSøknadsdata | undefined,
): Partial<StartdatoOgAndreYtelserFormValues> => {
    if (søknadsdata?.harAndreYtelser === undefined) return {};
    return {
        harAndreYtelser: søknadsdata.harAndreYtelser ? YesOrNo.YES : YesOrNo.NO,
        andreYtelser: søknadsdata.andreYtelser,
    };
};

export const toStartdatoOgAndreYtelserSøknadsdata = (
    data: StartdatoOgAndreYtelserFormValues,
): StartdatoOgAndreYtelserSøknadsdata => ({
    harAndreYtelser: data.harAndreYtelser === YesOrNo.YES,
    andreYtelser: data.harAndreYtelser === YesOrNo.YES ? (data.andreYtelser as AndreYtelse[] | undefined) : undefined,
});
