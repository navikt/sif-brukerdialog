import { useQuery } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { DeltakerApi } from '@navikt/ung-deltakelse-opplyser-api';
import { getKontonummer } from '../../api/kontonummer/getKontonummer';
import { søknadQueryKeys } from '../../queries/søknadQueries';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const useKontonummer = (enabled = true) => {
    return useQuery<DeltakerApi.KontonummerDto | null, ApiError>({
        queryKey: søknadQueryKeys.kontonummer,
        queryFn: getKontonummer,
        enabled,
        staleTime: 1000 * 60 * 5, // 5 minutter
        retry: 0,
    });
};
