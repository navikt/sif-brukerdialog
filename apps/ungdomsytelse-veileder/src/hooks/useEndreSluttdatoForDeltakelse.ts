import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EndrePeriodeDatoDto } from '@navikt/ung-deltakelse-opplyser-api';
import { queryKeys } from '../queries/queryKeys';
import { endreSluttdatoForDeltakelse } from '../api/deltakelse/endreSluttdatoForDeltakelse';

export const useEndreSluttdatoForDeltakelse = (deltakerId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { deltakelseId: string; payload: EndrePeriodeDatoDto }) =>
            endreSluttdatoForDeltakelse(data.deltakelseId, data.payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.deltakelserForDeltaker(deltakerId),
            });
        },
    });
};
