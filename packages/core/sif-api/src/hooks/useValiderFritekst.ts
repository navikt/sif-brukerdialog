import { useQuery } from '@tanstack/react-query';

import { validerFritekst } from '../api';
import { sifApiQueryKeys } from '../queryKeys';
import { ApiError, getInvalidParametersFromApiError } from '../utils/errorHandlers';

export const useValiderFritekst = (fritekst?: string) => {
    const enabled = !!fritekst && fritekst.trim().length > 0;

    const { isPending, isError, error } = useQuery<unknown, ApiError>({
        queryKey: [...sifApiQueryKeys.validerFritekst, fritekst],
        queryFn: () => validerFritekst({ verdi: fritekst! }),
        enabled,
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const invalidParameters = enabled && isError ? getInvalidParametersFromApiError(error) : undefined;

    return {
        isPending: enabled && isPending,
        invalidParameters,
    };
};
