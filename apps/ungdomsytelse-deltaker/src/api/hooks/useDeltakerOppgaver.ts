import { ApiError } from '@navikt/ung-common';
import { useQuery } from '@tanstack/react-query';

import { Oppgave } from '../../types/Oppgave';
import { getDeltakerOppgaver } from '../deltaker-oppgaver/getDeltakerOppgaver';
import { commonQueryKeys } from '../queries/commonQueries';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const useDeltakerOppgaver = (enabled = true) => {
    return useQuery<Oppgave[], ApiError>({
        queryKey: commonQueryKeys.deltakerOppgaver,
        queryFn: () => getDeltakerOppgaver(),
        staleTime: 1000 * 60 * 20, // 20 minutter
        enabled,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
