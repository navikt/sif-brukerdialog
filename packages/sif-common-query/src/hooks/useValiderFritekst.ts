import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { validerFritekst } from '../api';
import { sifCommonQueryKeys } from '../queryKeys';
import { invalidParameterProblemDetailSchema, InvalidParameterViolation } from '../types/invalidParameterProblemDetail';
import { AxiosError } from 'axios';
import { isApiAxiosError } from '../utils/errorHandlers';

const getInvalidParameterViolations = (error: AxiosError<any>): InvalidParameterViolation[] => {
    const result = invalidParameterProblemDetailSchema.safeParse(error.response?.data);
    return result.success && result.data.violations ? result.data.violations : [];
};

export const useValiderFritekst = (fritekst?: string) => {
    const [invalidParameters, setInvalidParameters] = useState<InvalidParameterViolation[] | undefined>(undefined);

    const enabled = !!fritekst && fritekst.trim().length > 0;

    const { isPending, isError, error } = useQuery({
        queryKey: [...sifCommonQueryKeys.validerFritekst, fritekst],
        queryFn: () => validerFritekst({ verdi: fritekst! }),
        enabled,
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        if (!enabled) {
            return;
        }
        if (isError) {
            try {
                if (isApiAxiosError(error)) {
                    const parameters = getInvalidParameterViolations(error.originalError);
                    setInvalidParameters(parameters && parameters.length > 0 ? parameters : undefined);
                } else {
                    setInvalidParameters(undefined);
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('Error parsing validation error:', err);
                setInvalidParameters(undefined);
            }
        } else {
            setInvalidParameters(undefined);
        }
    }, [isError, error, fritekst]);

    return {
        isPending: enabled && isPending,
        invalidParameters,
    };
};
