import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queries/queryKeys';
import { meldUtDeltaker } from '../api/deltakelse/meldUtDeltaker';

export const useMeldUtDeltaker = (deltakerId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (utmeldingsdata: { deltakelseId: string; utmeldingsdato: string }) =>
            meldUtDeltaker(utmeldingsdata.deltakelseId, utmeldingsdata.utmeldingsdato),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.deltakelserForDeltaker(deltakerId),
            });
        },
    });
};
