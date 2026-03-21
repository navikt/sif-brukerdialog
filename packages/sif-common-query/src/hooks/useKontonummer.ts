import { ApiError, sifCommonQueryKeys } from '@navikt/sif-common-query';
import { useQuery } from '@tanstack/react-query';

import { hentKontonummer } from '../api/kontonummerApi';
import { HarKontonummerEnum, UtvidetKontonummerInfo } from '../types/UtvidetKontonummerInfo';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const kontonummerFallback: UtvidetKontonummerInfo = { harKontonummer: HarKontonummerEnum.UVISST };

export const useKontonummer = (enabled = true) => {
    return useQuery<UtvidetKontonummerInfo, ApiError>({
        queryKey: sifCommonQueryKeys.kontonummer,
        queryFn: hentKontonummer,
        enabled,
        staleTime: 1000 * 60 * 20, // 20 minutter
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
