import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useFaroInstance } from '@navikt/sif-common-faro';

export const GlobalQueryLogger = () => {
    const queryClient = useQueryClient();
    const { faro } = useFaroInstance();

    useEffect(() => {
        if (!faro) {
            return;
        }
        const unsubscribeQuery = queryClient.getQueryCache().subscribe((event) => {
            if (event?.type === 'updated') {
                const query = event.query;
                const state = query.state;
                if (state.status === 'error' && state.error) {
                    faro.api.pushError(state.error, {
                        context: {
                            queryKey: query.queryKey,
                            source: 'TanStackQuery',
                        },
                    });
                }
            }
        });

        const unsubscribeMutation = queryClient.getMutationCache().subscribe((event) => {
            if (event?.type === 'updated') {
                const mutation = event.mutation;
                const state = mutation.state;
                if (state.status === 'error' && state.error) {
                    faro.api.pushError(state.error, {
                        context: {
                            mutationKey: JSON.stringify(mutation.options.mutationKey),
                            source: 'TanStackMutation',
                        },
                    });
                }
            }
        });

        return () => {
            unsubscribeQuery();
            unsubscribeMutation();
        };
    }, [queryClient, faro]);

    return null;
};
