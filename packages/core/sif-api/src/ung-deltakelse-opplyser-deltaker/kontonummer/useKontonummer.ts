import { useQuery } from '@tanstack/react-query';

import { sifApiQueryKeys } from '../../queryKeys';
import { ApiError } from '../../shared/errorHandlers';
import { hentKontonummer } from './kontonummerApi';
import { HarKontonummerEnum, UtvidetKontonummerInfo } from './UtvidetKontonummerInfo';

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
