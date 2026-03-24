import { YesOrNo } from '@sif/rhf';

import { BarnSøknadsdata } from '../../types/Soknadsdata';
import { BarnFormValues } from './BarnForm';

export const toBarnFormValues = (søknadsdata: BarnSøknadsdata | undefined): Partial<BarnFormValues> => {
    if (søknadsdata?.stemmerInfoOmBarn === undefined) {
        return {};
    }
    return {
        stemmerInfoOmBarn: søknadsdata.stemmerInfoOmBarn ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toBarnSøknadsdata = (data: BarnFormValues): BarnSøknadsdata => ({
    stemmerInfoOmBarn: data.stemmerInfoOmBarn === YesOrNo.YES,
});
