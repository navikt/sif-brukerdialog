import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { handleApiError, InvalidParameterViolation, isApiAxiosError, validerFritekst } from '@navikt/sif-common-query';
import { getInvalidParametersFromAxiosError } from '@navikt/sif-common-soknad-ds';

export const useValiderFritekst = () => {
    const [invalidParameters, setInvalidParameters] = useState<InvalidParameterViolation[] | undefined>(undefined);

    const mutation = useMutation({
        mutationFn: validerFritekst,
        onError: (error) => {
            try {
                const handledError = handleApiError(error);
                if (isApiAxiosError(handledError)) {
                    const parameters = getInvalidParametersFromAxiosError(handledError.originalError);
                    setInvalidParameters(parameters && parameters.length > 0 ? parameters : undefined);
                } else {
                    setInvalidParameters(undefined);
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('Error parsing validation error:', err);
                setInvalidParameters(undefined);
            }
        },
        onSuccess: () => {
            setInvalidParameters(undefined);
        },
    });

    const validateFritekst = useCallback(
        (fritekst?: string) => {
            if (fritekst && fritekst.trim().length > 0) {
                mutation.mutate({ verdi: fritekst });
            } else {
                setInvalidParameters(undefined);
            }
        },
        [mutation.mutate],
    );

    return {
        validateFritekst,
        isPending: mutation.isPending,
        invalidParameters,
    };
};
