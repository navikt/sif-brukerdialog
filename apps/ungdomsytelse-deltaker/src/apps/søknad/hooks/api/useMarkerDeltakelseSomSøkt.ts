import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '../../../../api/queries/commonQueries';
import { markerDeltakelseSomSøkt } from '../../api/deltakelse/markerDeltakelseSomSøkt';

/**
 * Setter en deltakelse som søkt. Brukes for å oppdatere direkte, uten å måtte
 * vente på ung-sak
 * @param deltakelseId Id til deltakelse som en har søkt på
 */
export const useMarkerDeltakelseSomSøkt = ({ deltakelseId }: { deltakelseId: string }) => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, { deltakelseId: string }>({
        mutationFn: () => markerDeltakelseSomSøkt(deltakelseId),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
    });
};
