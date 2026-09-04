import { useQuery } from '@tanstack/react-query';

import { sifApiQueryKeys } from '../queryKeys';
import { ApiError } from '../utils/errorHandlers';
import { tilgjengeligAktivitetspengerSoknad } from '../api/aktivitetspenger/tilgjengeligAktivitetspengerSoknad';
import { TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';

/**
 * Hook for å hente informasjon om tilgjengelig aktivitetspenger-søknad
 *
 * Denne informasjonen endrer seg når en søknad er sendt inn, ellers sjelden.
 * - query invalideres ved innsending, ellers brukes cached data inntil staleTime er nådd
 * - staleTime: 1000 * 30 * 20 - Data er alltid fresh i 20 minutter
 * - Ingen refetch på focus/mount/reconnect
 */
export const useTilgjengeligAktivitetspengerSøknad = (enabled = true) => {
    return useQuery<TilgjengeligSøknadResponse, ApiError>({
        queryKey: sifApiQueryKeys.aktivitetspengerTilgjengeligSøknad,
        queryFn: tilgjengeligAktivitetspengerSoknad,
        enabled,
        staleTime: 1000 * 30 * 20, // 20 minutter
        retry: 1,
    });
};
