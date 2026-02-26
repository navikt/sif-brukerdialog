import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getInvalidParameterViolations } from '../utils/getInvalidParameterViolations';
import { validerFritekst } from '../api';
import { sifCommonQueryKeys } from '../queryKeys';
import { InvalidParameterViolation } from '@navikt/sif-common-api';
import { handleApiError, isApiAxiosError } from '../api-clients';

export const useValiderFritekst = (fritekst?: string) => {
    const [invalidParameters, setInvalidParameters] = useState<InvalidParameterViolation[] | undefined>(undefined);

    const { isPending, isError, error, isEnabled } = useQuery({
        queryKey: [...sifCommonQueryKeys.validerFritekst, fritekst],
        queryFn: () => validerFritekst({ verdi: fritekst! }),
        enabled: !!fritekst && fritekst.trim().length > 0,
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        if (!isEnabled) {
            return;
        }
        if (isError) {
            try {
                const handledError = handleApiError(error);
                if (isApiAxiosError(handledError)) {
                    const parameters = getInvalidParameterViolations(handledError.originalError);
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
    }, [isError, error, isEnabled]);

    return {
        isPending: isEnabled && isPending,
        invalidParameters,
    };
};
