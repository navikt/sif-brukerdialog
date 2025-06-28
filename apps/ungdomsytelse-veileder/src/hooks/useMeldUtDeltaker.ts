import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queries } from '../queries/queryKeys';
import { meldUtDeltaker } from '../api/deltakelse/meldUtDeltaker';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';
import { ApiError, Deltakelse } from '@navikt/ung-common';

export const useMeldUtDeltaker = (deltakerId: string) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, { deltakelseId: string; dto: VeilederApi.DeltakelseUtmeldingDto }>({
        mutationFn: (data: { deltakelseId: string; dto: VeilederApi.DeltakelseUtmeldingDto }) =>
            meldUtDeltaker(data.deltakelseId, data.dto),
        onSuccess: () => {
            queryClient.invalidateQueries(queries.deltakelserForDeltaker(deltakerId));
        },
    });
};
