import { ApiError, isApiAxiosError } from '@navikt/ung-common';
import { logFaroError } from '@shared/utils/faroUtils';

export const logApiErrorFaro = (hookName: string, error: ApiError): void => {
    const logData = {
        hookName,
        context: error.context,
        message: error.message,
        type: error.type,
        timestamp: new Date().toISOString(),
        url: globalThis.location.href,
    };

    // Legg til sikkert metadata fra AxiosError uten sensitive data
    if (isApiAxiosError(error)) {
        const axiosError = error.originalError;
        Object.assign(logData, {
            httpStatus: axiosError.response?.status,
            httpStatusText: axiosError.response?.statusText,
            apiUrl: axiosError.config?.url,
            requestTimeout: axiosError.config?.timeout,
            // Legg til headers som ikke er sensitive
            responseHeaders: axiosError.response?.headers
                ? {
                      'x-correlation-id': axiosError.response.headers['x-correlation-id'],
                  }
                : undefined,
            errorCode: axiosError.code,
        });
    }

    logFaroError(`API error in ${hookName}`, JSON.stringify(logData, null, 2));
};
