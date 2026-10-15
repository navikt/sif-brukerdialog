import { ApiError, sifApiQueryKeys } from '@sif/api';
import { useQuery } from '@tanstack/react-query';

import { hentKontonummer } from '../api/kontonummerApi';
import { HarKontonummerEnum, UtvidetKontonummerInfo } from '../types/UtvidetKontonummerInfo';

export const kontonummerFallback: UtvidetKontonummerInfo = { harKontonummer: HarKontonummerEnum.UVISST };

/**
 * Henter kontonummer for innlogget deltaker
 */
export const useKontonummer = (enabled = true) => {
    return useQuery<UtvidetKontonummerInfo, ApiError>({
        queryKey: sifApiQueryKeys.kontonummer,
        queryFn: hentKontonummer,
        enabled,
        staleTime: 1000 * 60 * 20, // 20 minutter
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
