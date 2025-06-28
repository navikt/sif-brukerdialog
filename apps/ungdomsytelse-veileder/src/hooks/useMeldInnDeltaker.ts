import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, Deltakelse } from '@navikt/ung-common';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';
import { meldInnDeltaker } from '../api/deltakelse/meldInnDeltaker';
import { queries } from '../queries/queryKeys';

export const useMeldInnDeltaker = (deltakerId: string) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, VeilederApi.DeltakelseInnmeldingDto>({
        mutationFn: meldInnDeltaker,
        onSuccess: () => {
            queryClient.invalidateQueries(queries.deltakelserForDeltaker(deltakerId));
        },
    });
};
