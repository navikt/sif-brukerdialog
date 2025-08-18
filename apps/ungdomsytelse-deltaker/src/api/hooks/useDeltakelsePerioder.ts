import { useQuery } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { getDeltakelsePerioder } from '../deltakelse-perioder/getDeltakelsePerioder';
import { commonQueryKeys } from '../queries/commonQueries';
import { DeltakelsePeriode } from '../../types/DeltakelsePeriode';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const useDeltakelsePerioder = (enabled = true) => {
    return useQuery<DeltakelsePeriode[], ApiError>({
        queryKey: commonQueryKeys.deltakelseperioder,
        queryFn: () => getDeltakelsePerioder(),
        staleTime: 1000 * 60 * 20, // 20 minutter
        enabled,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
