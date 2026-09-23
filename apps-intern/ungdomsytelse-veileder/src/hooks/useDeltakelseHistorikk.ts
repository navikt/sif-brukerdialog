import { DeltakelseHistorikkDto } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { ApiError } from '@sif/api';
import { useQuery } from '@tanstack/react-query';

import { getDeltakelseHistorikk } from '../api/deltakelse/deltakelseHistorikk';
import { queryKeys } from '../queries/queryKeys';

/**
 * Henter historikk for en deltakelse
 * @param deltakelseId UUID for deltakelse
 * @param enabled Optional: default true
 */
export const useDeltakelserHistorikk = (deltakelseId: string, enabled = true) => {
    return useQuery<DeltakelseHistorikkDto[], ApiError>({
        queryKey: queryKeys.deltakelseHistorikk(deltakelseId),
        queryFn: () => getDeltakelseHistorikk(deltakelseId),
        enabled: enabled && !!deltakelseId,
        retry: 1,
    });
};
