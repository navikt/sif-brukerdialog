import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getVedleggIdFromResponseHeaderLocation, lagreVedlegg, slettVedlegg } from '../api/vedleggApi';
import { sifCommonQueryKeys } from '../queryKeys';

// Re-export utility function
export { getVedleggIdFromResponseHeaderLocation };

// Hook for uploading an attachment
export const useLagreVedlegg = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: lagreVedlegg,
        onSuccess: () => {
            // Invalidate any vedlegg-related queries when upload succeeds
            queryClient.invalidateQueries({
                queryKey: sifCommonQueryKeys.vedlegg,
            });
        },
    });
};

// Hook for deleting an attachment
export const useSlettVedlegg = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: slettVedlegg,
        onSuccess: (_data, vedleggId) => {
            // Remove the specific vedlegg from cache
            queryClient.removeQueries({
                queryKey: [...sifCommonQueryKeys.vedlegg, vedleggId],
            });
            // Invalidate any other vedlegg-related queries
            queryClient.invalidateQueries({
                queryKey: sifCommonQueryKeys.vedlegg,
            });
        },
    });
};
