import * as Sentry from '@sentry/react';
import { isApiAxiosError, isApiError } from '@sif/api';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

/** Setter opp QueryClient med custom error handling for logging til Sentry */
const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (isApiAxiosError(error) && error.originalError.response?.status === 401) {
                return;
            }
            const extras = isApiError(error)
                ? { type: error.type, context: error.context, message: error.message, queryKey: query.queryKey }
                : { message: error.message, queryKey: query.queryKey };

            Sentry.withScope((scope) => {
                scope.setExtras(extras);
                Sentry.captureException(isApiError(error) ? error.originalError : error);
            });
        },
    }),
});

export const SifQueryClientProvider = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
