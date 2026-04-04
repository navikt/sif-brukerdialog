import { BarnSøknadsdata } from '../../types/Soknadsdata';
import { BarnFormFields, BarnFormValues } from './types';

export const toBarnFormValues = (søknadsdata: BarnSøknadsdata | undefined): Partial<BarnFormValues> => {
    if (!søknadsdata) {
        return {};
    }

    return {
        [BarnFormFields.barnetSøknadenGjelder]: søknadsdata.barnetSøknadenGjelder,
    };
};

export const toBarnSøknadsdata = (data: BarnFormValues): BarnSøknadsdata | undefined => {
    const aktørId = data[BarnFormFields.barnetSøknadenGjelder];
    if (!aktørId) {
        return undefined;
    }

    return {
        barnetSøknadenGjelder: aktørId,
    };
};
