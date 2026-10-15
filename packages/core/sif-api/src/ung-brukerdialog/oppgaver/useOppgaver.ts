import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { useQuery } from '@tanstack/react-query';

import { sifApiQueryKeys } from '../../queryKeys';
import { ApiError } from '../../shared/errorHandlers';
import { Oppgave } from './Oppgave';
import { hentOppgaver } from './oppgaverApi';

/**
 * Henter alle oppgaver for innlogget deltaker
 */
export const useOppgaver = (ytelsetype: OppgaveYtelsetype, enabled = true) => {
    return useQuery<Oppgave[], ApiError>({
        queryKey: [...sifApiQueryKeys.oppgaver, ytelsetype],
        queryFn: () => hentOppgaver(ytelsetype),
        staleTime: 1000 * 60 * 20, // 20 minutter
        enabled,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
