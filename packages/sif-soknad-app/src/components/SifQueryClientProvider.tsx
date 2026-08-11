import { isApiAxiosError, isApiError } from '@sif/api';
import { captureException } from '@sif/apm';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useRef } from 'react';

const createQueryClient = () =>
    new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                if (isApiAxiosError(error) && error.originalError.response?.status === 401) {
                    return;
                }
                const extras = isApiError(error)
                    ? { type: error.type, context: error.context, message: error.message, queryKey: query.queryKey }
                    : { message: error instanceof Error ? error.message : String(error), queryKey: query.queryKey };

                const captureTarget = isApiError(error) ? error.originalError : error;
                captureException(captureTarget instanceof Error ? captureTarget : new Error(String(captureTarget)));
                console.error('QueryClient error:', extras);
            },
        }),
    });

export const SifQueryClientProvider = ({ children }: PropsWithChildren) => {
    // Én stabil instans per provider-mount — unngår delt cache mellom tester og hot-reload.
    const clientRef = useRef<QueryClient | null>(null);
    if (!clientRef.current) {
        clientRef.current = createQueryClient();
    }
    return <QueryClientProvider client={clientRef.current}>{children}</QueryClientProvider>;
};
