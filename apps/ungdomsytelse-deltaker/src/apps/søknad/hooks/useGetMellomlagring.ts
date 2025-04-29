import { useQuery } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { queryKeys } from '../../../queries/queryKeys';
import { getMellomlagring, MellomlagringDTO } from '../../../api/mellomlagring/mellomlagring';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const useGetMellomlagring = () => {
    return useQuery<MellomlagringDTO, ApiError>({
        queryKey: queryKeys.getMellomlagring,
        queryFn: () => getMellomlagring(),
        enabled: true,
        retry: false,
    });
};
