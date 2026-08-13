import { appLogger } from '@shared/utils/appLogger';
import { ApiError, isApiAxiosError } from '@sif/api';

export const logApiErrorFaro = (hookName: string, error: ApiError): void => {
    // Allowlist: kun type, statuskode og correlation-id — ingen URL, context eller response-body
    const logData: Record<string, unknown> = {
        hookName,
        type: error.type,
    };

    if (isApiAxiosError(error)) {
        const axiosError = error.originalError;
        logData.httpStatus = axiosError.response?.status;
        logData.errorCode = axiosError.code;
        logData.correlationId = axiosError.response?.headers?.['x-correlation-id'];
    }

    appLogger.logError(`API error in ${hookName}`, logData);
};
