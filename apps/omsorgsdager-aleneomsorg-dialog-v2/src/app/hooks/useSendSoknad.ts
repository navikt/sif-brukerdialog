import { ApiError, ApiErrorType, isApiAxiosError } from '@sif/api';
import { appLogger } from '@sif/apm';
import { useAnalyticsInstance, useSøknadSendt } from '@sif/soknad-app';
import { useMutation } from '@tanstack/react-query';

import { sendSoknad } from '../api/sendSoknad';
import { SøknadApiData } from '../types/SoknadApiData';

export const useSendSøknad = () => {
    const { logSkjemaFeilet } = useAnalyticsInstance();
    const { onSøknadSendt } = useSøknadSendt();
    const { mutate, isPending, error } = useMutation<void, ApiError, SøknadApiData>({
        mutationFn: sendSoknad,
        onSuccess: onSøknadSendt,
        onError: (e) => {
            logSkjemaFeilet();

            if (e.type === ApiErrorType.ZodValidationError) {
                appLogger.logError(`sendSøknad: request-validering feilet for felt: ${e.message}`);
            } else if (isApiAxiosError(e)) {
                appLogger.logApiError(e.originalError, 'sendSøknad');
            } else {
                appLogger.logError(`sendSøknad: innsending feilet (${e.type})`);
            }
        },
    });

    return {
        sendSøknad: mutate,
        isPending,
        sendSøknadError: error,
    };
};
