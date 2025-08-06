import { useEffect, useState } from 'react';
import { handleApiError, InvalidParameterViolation, isApiAxiosError } from '@navikt/sif-common-query';
import { getInvalidParametersFromAxiosError } from '@navikt/sif-common-soknad-ds';
import { useValiderFritekstFelt } from '../api/hooks/useValiderFritekstFelt';

export const useValiderFritekst = (fritekst?: string) => {
    const result = useValiderFritekstFelt(fritekst);
    const [invalidParameters, setInvalidParameter] = useState<InvalidParameterViolation[] | null>(null);

    useEffect(() => {
        if (result.isError) {
            try {
                const error = handleApiError(result.error);
                if (isApiAxiosError(error)) {
                    const parameters = getInvalidParametersFromAxiosError(error.originalError);
                    setInvalidParameter(parameters);
                } else {
                    setInvalidParameter(null);
                }
            } catch (err) {
                console.error('Error parsing validation error:', err);
                setInvalidParameter(null);
            }
        } else {
            setInvalidParameter(null);
        }
    }, [result.isError, result.error]);

    return {
        isPending: result.isEnabled ? result.isPending : false,
        isFetched: result.isFetched,
        invalidParameters: invalidParameters && invalidParameters.length > 0 ? invalidParameters : undefined,
    };
};
