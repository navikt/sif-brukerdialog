import { YesOrNo } from '@sif/rhf';

import { MedlemskapSøknadsdata } from '../../types/Søknadsdata';
import { MedlemskapFormValues } from './MedlemskapForm';

export const toMedlemskapFormValues = (
    søknadsdata: MedlemskapSøknadsdata | undefined,
): Partial<MedlemskapFormValues> => {
    if (søknadsdata?.erMedlemIFolketrygden === undefined) return {};
    return {
        erMedlemIFolketrygden: søknadsdata.erMedlemIFolketrygden ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const toMedlemskapSøknadsdata = (data: MedlemskapFormValues): MedlemskapSøknadsdata => ({
    erMedlemIFolketrygden: data.erMedlemIFolketrygden === YesOrNo.YES,
});
