import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { DeltakelseUtmeldingDto } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { meldUtDeltaker } from '../api/deltakelse/meldUtDeltaker';
import { queries } from '../queries/queryKeys';
import { Deltakelse } from '../types/Deltakelse';

export const useMeldUtDeltaker = (deltakerId: string) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, { deltakelseId: string; dto: DeltakelseUtmeldingDto }>({
        mutationFn: (data: { deltakelseId: string; dto: DeltakelseUtmeldingDto }) =>
            meldUtDeltaker(data.deltakelseId, data.dto),
        onSuccess: () => {
            queryClient.invalidateQueries(queries.deltakelserForDeltaker(deltakerId));
        },
    });
};
