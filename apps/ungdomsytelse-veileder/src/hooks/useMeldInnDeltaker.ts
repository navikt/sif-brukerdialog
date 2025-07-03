import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';

import { meldInnDeltaker } from '../api/deltakelse/meldInnDeltaker';
import { queries } from '../queries/queryKeys';
import { DeltakelseInnmeldingDto } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { Deltakelse } from '../types/Deltakelse';

export const useMeldInnDeltaker = (deltakerId: string) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, DeltakelseInnmeldingDto>({
        mutationFn: meldInnDeltaker,
        onSuccess: () => {
            queryClient.invalidateQueries(queries.deltakelserForDeltaker(deltakerId));
        },
    });
};
