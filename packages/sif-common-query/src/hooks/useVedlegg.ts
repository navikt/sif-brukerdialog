import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VedleggController } from '@navikt/k9-brukerdialog-prosessering-api';
import { sifCommonQueryKeys } from '../queryKeys';

/**
 * Extract vedlegg ID from response location header
 * @param url The location URL returned from the upload response
 * @returns The vedlegg ID
 */
export const getVedleggIdFromResponseHeaderLocation = (url: string): string => {
    const id = url.split('vedlegg/')[1];
    if (!id || id.length === 0) {
        throw new Error('Kunne ikke hente vedleggId fra url');
    }
    return id;
};

// Hook for uploading an attachment
export const useLagreVedlegg = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (vedlegg: Blob | File) => {
            const response = await VedleggController.lagreVedlegg({
                body: {
                    vedlegg,
                },
            });
            return response;
        },
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
        mutationFn: async (vedleggId: string) => {
            const response = await VedleggController.slettVedlegg({
                path: {
                    vedleggId,
                },
            });
            return response.data;
        },
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

// Hook for fetching a specific attachment
export const useHentVedlegg = (vedleggId: string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: [...sifCommonQueryKeys.vedlegg, vedleggId],
        queryFn: async () => {
            const response = await VedleggController.hentVedlegg({
                path: {
                    vedleggId,
                },
            });
            return response.data;
        },
        enabled: options?.enabled ?? !!vedleggId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};
