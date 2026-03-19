import { ApiError, sifCommonQueryKeys } from '@navikt/sif-common-query';
import { KontonummerDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useQuery } from '@tanstack/react-query';

import { hentKontonummer } from '../api/kontonummerApi';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const useKontonummer = (enabled = true) => {
    return useQuery<KontonummerDto | null, ApiError>({
        queryKey: sifCommonQueryKeys.kontonummer,
        queryFn: hentKontonummer,
        enabled,
        staleTime: 1000 * 60 * 20, // 20 minutter
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
