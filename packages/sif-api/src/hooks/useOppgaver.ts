import { ApiError } from '@navikt/ung-common';
import { useQuery } from '@tanstack/react-query';

import { hentOppgaver } from '../api/oppgaverApi';
import { sifCommonQueryKeys } from '../queryKeys';
import { Oppgave } from '../types/Oppgave';

/**
 * Henter alle oppgaver for innlogget deltaker
 */
export const useOppgaver = (enabled = true) => {
    return useQuery<Oppgave[], ApiError>({
        queryKey: sifCommonQueryKeys.oppgaver,
        queryFn: () => hentOppgaver(),
        staleTime: 1000 * 60 * 20, // 20 minutter
        enabled,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
