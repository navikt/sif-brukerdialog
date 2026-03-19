import { YesOrNo } from '@sif/rhf';

import { BarnSøknadsdata } from '../../types/Søknadsdata';
import { BarnFormValues } from './BarnForm';

export const toBarnFormValues = (søknadsdata: BarnSøknadsdata | undefined): Partial<BarnFormValues> => {
    if (søknadsdata?.harBarn === undefined) return {};
    return {
        harBarn: søknadsdata.harBarn ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toBarnSøknadsdata = (data: BarnFormValues): BarnSøknadsdata => ({
    harBarn: data.harBarn === YesOrNo.YES,
});
