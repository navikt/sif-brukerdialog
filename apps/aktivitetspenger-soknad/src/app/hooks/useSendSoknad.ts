import { sendSøknad } from '@app/api/sendSoknad';
import { SøknadApiData } from '@app/types/SoknadApiData';
import { ApiError, ApiErrorType, isApiAxiosError } from '@sif/api';
import { appLogger } from '@sif/apm';
import { useAnalyticsInstance } from '@sif/soknad-app';
import { useMutation } from '@tanstack/react-query';

export const useSendSøknad = () => {
    const { logSkjemaFeilet } = useAnalyticsInstance();

    return useMutation<void, ApiError, SøknadApiData>({
        mutationFn: (data) => sendSøknad(data),
        onError: (error) => {
            logSkjemaFeilet();

            if (error.type === ApiErrorType.ZodValidationError) {
                // message inneholder feltstier og Zod-meldinger for teknisk feilsøking.
                // Requesten forlot aldri nettleseren — backend har ingen logg av dette.
                appLogger.logError(`sendSøknad: request-validering feilet for felt: ${error.message}`);
            } else if (isApiAxiosError(error)) {
                appLogger.logApiError(error.originalError, 'sendSøknad');
            } else {
                appLogger.logError(`sendSøknad: innsending feilet (${error.type})`);
            }
        },
    });
};
