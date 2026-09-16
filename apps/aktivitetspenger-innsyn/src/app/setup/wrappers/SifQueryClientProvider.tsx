import { isApiAxiosError, isApiError } from '@sif/api';
import { appLogger } from '@sif/apm';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (isApiAxiosError(error) && error.originalError.response?.status === 401) {
                return;
            }
            // Allowlisted subset — first queryKey element is always a static operation name, never user data
            const operation = String(query.queryKey[0] ?? 'unknown');
            const captureContext = isApiError(error)
                ? { type: error.type, context: error.context, operation }
                : { operation };

            const captureTarget = isApiError(error) ? error.originalError : error;
            appLogger.logException(
                captureTarget instanceof Error ? captureTarget : new Error(String(captureTarget)),
                captureContext,
            );
        },
    }),
});

export const SifQueryClientProvider = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
