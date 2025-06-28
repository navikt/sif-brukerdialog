import { useQuery } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { KontonummerDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { getKontonummer } from '../../api/kontonummer/getKontonummer';
import { søknadQueryKeys } from '../../queries/søknadQueries';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const useKontonummer = (enabled = true) => {
    return useQuery<KontonummerDto | null, ApiError>({
        queryKey: søknadQueryKeys.kontonummer,
        queryFn: getKontonummer,
        enabled,
        staleTime: 1000 * 60 * 5, // 5 minutter
        retry: 0,
    });
};
