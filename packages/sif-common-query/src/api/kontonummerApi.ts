import { handleApiError } from '@navikt/sif-common-query';
import { Deltaker, KontonummerDto, zKontonummerDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

import { HarKontonummerEnum, UtvidetKontonummerInfo } from '../types/UtvidetKontonummerInfo';

const getKontoInfo = (data?: KontonummerDto | null): UtvidetKontonummerInfo => {
    if (!data || data === null) {
        return {
            harKontonummer: HarKontonummerEnum.UVISST,
        };
    }
    return data?.harKontonummer && data.kontonummer
        ? {
              harKontonummer: HarKontonummerEnum.JA,
              kontonummerFraRegister: data.kontonummer,
              formatertKontonummer: formaterKontonummer(data.kontonummer),
          }
        : {
              harKontonummer: HarKontonummerEnum.NEI,
          };
};

const inneholderKunTall = (value: string): boolean => {
    return /^\d+$/.test(value);
};

const formaterKontonummer = (value?: string): string => {
    if (!value || !inneholderKunTall(value) || value.length !== 11) {
        return value || '';
    }
    return `${value.slice(0, 4)} ${value.slice(4, 6)} ${value.slice(6)}`;
};

export const hentKontonummer = async (): Promise<UtvidetKontonummerInfo> => {
    try {
        const { data } = await Deltaker.hentKontonummer();
        return getKontoInfo(zKontonummerDto.parse(data));
    } catch (e) {
        throw handleApiError(e, 'hentKontonummer');
    }
};
