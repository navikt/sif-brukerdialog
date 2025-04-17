import { useQuery } from '@tanstack/react-query';
import { getDeltakelserForDeltaker } from '../api/deltakelse/getDeltakelserForDeltaker';
import { queryKeys } from '../queries/queryKeys';

/**
 * Henter alle deltakelser knyttet til en deltaker-id.
 * @param deltakerId UUID for deltaker
 * @param enabled Optional: default true
 */
export const useDeltakelserForDeltaker = (deltakerId: string, enabled = true) => {
    return useQuery({
        queryKey: queryKeys.deltakelserForDeltaker(deltakerId),
        queryFn: () => getDeltakelserForDeltaker(deltakerId),
        enabled: enabled && !!deltakerId,
    });
};
