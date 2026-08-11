import { captureException } from '@nais/apm';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { isDevMode } from '@navikt/sif-common-env';

export const GlobalQueryLogger = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribeQuery = queryClient.getQueryCache().subscribe((event) => {
            if (event?.type === 'updated') {
                const query = event.query;
                const state = query.state;
                if (state.status === 'error' && state.error) {
                    if (isDevMode()) {
                        console.error(state.error);
                    }
                    captureException(state.error instanceof Error ? state.error : new Error(String(state.error)));
                }
            }
        });

        const unsubscribeMutation = queryClient.getMutationCache().subscribe((event) => {
            if (event?.type === 'updated') {
                const mutation = event.mutation;
                const state = mutation.state;
                if (state.status === 'error' && state.error) {
                    captureException(state.error instanceof Error ? state.error : new Error(String(state.error)));
                }
            }
        });

        return () => {
            unsubscribeQuery();
            unsubscribeMutation();
        };
    }, [queryClient]);

    return null;
};
