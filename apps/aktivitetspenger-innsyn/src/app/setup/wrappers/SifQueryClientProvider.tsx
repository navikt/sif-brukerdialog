import { isApiAxiosError, isApiError } from '@sif/api';
import { captureException } from '@sif/apm';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (isApiAxiosError(error) && error.originalError.response?.status === 401) {
                return;
            }
            // Allowlisted subset — type/context identify the operation; queryKey serialized to avoid raw user data
            const captureContext = isApiError(error)
                ? { type: error.type, context: error.context, queryKey: JSON.stringify(query.queryKey) }
                : { queryKey: JSON.stringify(query.queryKey) };

            const captureTarget = isApiError(error) ? error.originalError : error;
            captureException(captureTarget instanceof Error ? captureTarget : new Error(String(captureTarget)), {
                context: captureContext,
            });
        },
    }),
});

export const SifQueryClientProvider = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
