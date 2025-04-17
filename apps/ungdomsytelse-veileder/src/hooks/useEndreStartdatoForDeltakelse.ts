import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EndrePeriodeDatoDto } from '@navikt/ung-deltakelse-opplyser-api';
import { endreStartdatoForDeltakelse } from '../api/deltakelse/endreStartdatoForDeltakelse';
import { queryKeys } from '../queries/queryKeys';

export const useEndreStartdatoForDeltakelse = (deltakerId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { deltakelseId: string; payload: EndrePeriodeDatoDto }) =>
            endreStartdatoForDeltakelse(data.deltakelseId, data.payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.deltakelserForDeltaker(deltakerId),
            });
        },
    });
};
