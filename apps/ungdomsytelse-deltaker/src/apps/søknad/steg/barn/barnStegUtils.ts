import { YesOrNo } from '@sif/rhf';

import { BarnSøknadsdata } from '../../setup/types/Søknadsdata';
import { BarnFormValues } from './types';

export const toBarnFormValues = (søknadsdata: BarnSøknadsdata | undefined): Partial<BarnFormValues> => {
    if (!søknadsdata) return {};
    return { barnStemmer: søknadsdata.barnStemmer };
};

export const toBarnSøknadsdata = (values: BarnFormValues): BarnSøknadsdata => ({
    barnStemmer: values.barnStemmer as YesOrNo,
});
