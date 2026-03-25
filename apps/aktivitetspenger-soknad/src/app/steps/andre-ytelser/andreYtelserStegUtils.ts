import { AndreYtelserSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';

import { AndreYtelse, AndreYtelserFormValues } from './types';

export const toAndreYtelserFormValues = (
    søknadsdata: AndreYtelserSøknadsdata | undefined,
): Partial<AndreYtelserFormValues> => {
    if (søknadsdata?.harAndreYtelser === undefined) return {};
    return {
        harAndreYtelser: søknadsdata.harAndreYtelser ? YesOrNo.YES : YesOrNo.NO,
        andreYtelser: søknadsdata.andreYtelser,
    };
};

export const toAndreYtelserSøknadsdata = (data: AndreYtelserFormValues): AndreYtelserSøknadsdata => ({
    harAndreYtelser: data.harAndreYtelser === YesOrNo.YES,
    andreYtelser: data.harAndreYtelser === YesOrNo.YES ? (data.andreYtelser as AndreYtelse[] | undefined) : undefined,
});
