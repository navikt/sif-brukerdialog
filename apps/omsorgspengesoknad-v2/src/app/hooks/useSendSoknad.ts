import { ApiError, ApiErrorType, isApiAxiosError } from '@sif/api';
import { appLogger } from '@sif/apm';
import { useAnalyticsInstance, useSøknadSendt } from '@sif/soknad-app';
import { useMutation } from '@tanstack/react-query';

import { sendSøknad } from '../api/sendSoknad';
import { SøknadApiData } from '../types/SoknadApiData';

export const useSendSøknad = () => {
    const { logSkjemaFeilet } = useAnalyticsInstance();
    const { onSøknadSendt } = useSøknadSendt();

    const { mutate, isPending, error } = useMutation<void, ApiError, SøknadApiData>({
        mutationFn: (data) => sendSøknad(data),
        // Holder isPending til søknaden er markert som sendt. Se useSøknadSendt.
        onSuccess: onSøknadSendt,
        onError: (e) => {
            logSkjemaFeilet();

            if (e.type === ApiErrorType.ZodValidationError) {
                // message inneholder feltstier og Zod-meldinger for teknisk feilsøking.
                // Requesten forlot aldri nettleseren — backend har ingen logg av dette.
                appLogger.logError(`sendSøknad: request-validering feilet for felt: ${e.message}`);
            } else if (isApiAxiosError(e)) {
                appLogger.logApiError(e.originalError, 'sendSøknad');
            } else {
                appLogger.logError(`sendSøknad: innsending feilet (${e.type})`);
            }
        },
    });

    return { sendSøknad: mutate, isPending, sendSøknadError: error };
};
