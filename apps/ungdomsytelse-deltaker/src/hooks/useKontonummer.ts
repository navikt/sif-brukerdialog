import { useQuery } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { KontonummerDto } from '@navikt/ung-deltakelse-opplyser-api';
import { getKontonummer } from '../api/kontonummer/getKontonummer';
import { queryKeys } from '../queries/queryKeys';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const useKontonummer = (enabled = true) => {
    return useQuery<KontonummerDto, ApiError>({
        queryKey: queryKeys.kontonummer,
        queryFn: getKontonummer,
        enabled,
        retry: 1,
    });
};
