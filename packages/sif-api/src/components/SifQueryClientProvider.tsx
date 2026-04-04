import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

import { isApiAxiosError } from '../utils/errorHandlers';

export type QueryCacheOnErrorArgs = {
    error: Error;
    queryKey: readonly unknown[];
    meta: Record<string, unknown> | undefined;
};

interface Props extends PropsWithChildren {
    onError?: (args: QueryCacheOnErrorArgs) => void;
}

export const SifQueryClientProvider = ({ children, onError }: Props) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (error, query) => {
                        if (isApiAxiosError(error) && error.originalError.response?.status === 401) {
                            return;
                        }
                        onError?.({ error, queryKey: query.queryKey, meta: query.meta });
                    },
                }),
            }),
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
