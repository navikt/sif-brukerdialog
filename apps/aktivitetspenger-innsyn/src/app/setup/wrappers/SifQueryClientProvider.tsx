import { isApiAxiosError, isApiError } from '@sif/api';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (isApiAxiosError(error) && error.originalError.response?.status === 401) {
                return;
            }
            const extras = isApiError(error)
                ? { type: error.type, context: error.context, message: error.message, queryKey: query.queryKey }
                : { message: error instanceof Error ? error.message : String(error), queryKey: query.queryKey };

            console.error('QueryClient error:', extras);
        },
    }),
});

export const SifQueryClientProvider = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
