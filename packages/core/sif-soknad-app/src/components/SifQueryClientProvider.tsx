import { isApiAxiosError, isApiError, isForbiddenApiError } from '@sif/api';
import { appLogger } from '@sif/apm';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useRef } from 'react';

const createQueryClient = () =>
    new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                // 401 sendes til innlogging og 403/451 vises som ingen tilgang, så de er ikke feil i appen
                if (
                    (isApiAxiosError(error) && error.originalError.response?.status === 401) ||
                    isForbiddenApiError(error)
                ) {
                    return;
                }
                // Allowlisted subset — first queryKey element is always a static operation name, never user data
                const operation = String(query.queryKey[0] ?? 'unknown');
                const captureContext = isApiError(error)
                    ? { type: error.type, context: error.context, operation }
                    : { operation };

                appLogger.logException(isApiError(error) ? error.originalError : error, captureContext);
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
