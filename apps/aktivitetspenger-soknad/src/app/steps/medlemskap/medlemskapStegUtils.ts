import { MedlemskapSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';
import { getYesOrNoFromBoolean } from '@sif/utils';

import { MedlemskapFormValues } from './types';

export const toMedlemskapStegFormValues = (
    søknadsdata: MedlemskapSøknadsdata | undefined,
): Partial<MedlemskapFormValues> => {
    if (søknadsdata?.harBoddINorge === undefined) return {};
    return {
        harBoddINorge: getYesOrNoFromBoolean(søknadsdata.harBoddINorge),
        harJobbetINorge: getYesOrNoFromBoolean(søknadsdata.harJobbetINorge),
        harJobbetUtenforNorge: getYesOrNoFromBoolean(søknadsdata.harJobbetUtenforNorge),
        bostederUtenforNorge: søknadsdata.bostederUtenforNorge,
        arbeidsstederUtenforNorge: søknadsdata.arbeidsstederUtenforNorge,
    };
};

export const toMedlemskapStegSøknadsdata = (data: MedlemskapFormValues): MedlemskapSøknadsdata => {
    const harBoddINorge = data.harBoddINorge === YesOrNo.YES;
    return {
        harBoddINorge: harBoddINorge,
        harJobbetINorge: data.harJobbetINorge ? data.harJobbetINorge === YesOrNo.YES : undefined,
        harJobbetUtenforNorge: data.harJobbetUtenforNorge ? data.harJobbetUtenforNorge === YesOrNo.YES : undefined,
        bostederUtenforNorge: data.bostederUtenforNorge,
        arbeidsstederUtenforNorge: data.arbeidsstederUtenforNorge,
    };
};
