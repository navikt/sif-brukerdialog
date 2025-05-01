import { useQuery } from '@tanstack/react-query';
import { fetchBarn, RegistrertBarn } from '@navikt/sif-common-api';
import { ApiError } from '@navikt/ung-common';
import { søknadQueryKeys } from '../../queries/søknadQueries';

/**
 * Henter informasjon om innlogget bruker
 */
export const useBarn = (enabled = true) => {
    return useQuery<RegistrertBarn[], ApiError>({
        queryKey: søknadQueryKeys.barn,
        queryFn: () => fetchBarn(),
        enabled,
        staleTime: 1000 * 60 * 5, // 5 minutter
        retry: 1,
    });
};
