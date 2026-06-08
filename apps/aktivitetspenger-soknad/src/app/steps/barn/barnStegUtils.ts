import { BarnSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';

import { BarnFormValues } from './types';

export const toBarnFormValues = (søknadsdata: BarnSøknadsdata | undefined): Partial<BarnFormValues> => {
    if (søknadsdata?.informasjonStemmer === undefined) return {};
    return {
        informasjonStemmer: søknadsdata.informasjonStemmer ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toBarnSøknadsdata = (data: BarnFormValues): BarnSøknadsdata => ({
    informasjonStemmer: data.informasjonStemmer === YesOrNo.YES,
});
