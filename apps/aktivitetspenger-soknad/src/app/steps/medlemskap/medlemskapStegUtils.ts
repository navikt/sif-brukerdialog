import { MedlemskapSøknadsdata } from '@app/types/Soknadsdata';
import { getYesOrNoFromBoolean } from '@sif/utils';

import { getMedlemskapSynlighet, yesOrNoToBoolean } from './medlemskapSynlighet';
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

/** Lagrer kun svar på spørsmål som var synlige, slik at data fra angrede grener ikke blir med. */
export const toMedlemskapStegSøknadsdata = (data: MedlemskapFormValues): MedlemskapSøknadsdata => {
    const harBoddINorge = yesOrNoToBoolean(data.harBoddINorge);
    const harJobbetINorge = yesOrNoToBoolean(data.harJobbetINorge);
    const harJobbetUtenforNorge = yesOrNoToBoolean(data.harJobbetUtenforNorge);

    const synlig = getMedlemskapSynlighet({ harBoddINorge, harJobbetINorge, harJobbetUtenforNorge });

    return {
        harBoddINorge: harBoddINorge === true,
        harJobbetINorge: synlig.harJobbetINorge ? harJobbetINorge : undefined,
        harJobbetUtenforNorge: synlig.harJobbetUtenforNorge ? harJobbetUtenforNorge : undefined,
        bostederUtenforNorge: synlig.bostederUtenforNorge ? data.bostederUtenforNorge : undefined,
        arbeidsstederUtenforNorge: synlig.arbeidsstederUtenforNorge ? data.arbeidsstederUtenforNorge : undefined,
    };
};
