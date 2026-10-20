import type { ISODate } from '@sif/utils';
import { useQuery } from '@tanstack/react-query';

import { sifApiQueryKeys } from '../../queryKeys';
import { ApiError } from '../../shared/errorHandlers';
import { hentDagensDato } from './dagensDatoApi';

export const useDagensDato = () => {
    return useQuery<ISODate, ApiError>({
        queryKey: sifApiQueryKeys.dagensDato,
        queryFn: hentDagensDato,
        staleTime: 1000 * 60 * 10,
        retry: 1,
    });
};
