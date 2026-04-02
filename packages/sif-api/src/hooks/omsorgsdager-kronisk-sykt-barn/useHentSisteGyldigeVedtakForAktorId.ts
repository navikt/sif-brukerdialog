import { ApiError, sifApiQueryKeys } from '@sif/api';
import { useQuery } from '@tanstack/react-query';

import { hentSisteGyldigeVedtakForAktørId } from '../../api';
import { SisteGyldigeVedtakForAktørId } from '../../types';

export const useHentSisteGyldigeVedtakForAktørId = (aktørId: string, enabled = true) => {
    return useQuery<SisteGyldigeVedtakForAktørId, ApiError>({
        queryKey: sifApiQueryKeys.sisteGyldigeVedtakForAktørId(aktørId),
        queryFn: hentSisteGyldigeVedtakForAktørId.bind(null, aktørId),
        enabled,
        staleTime: 1000 * 60 * 20, // 20 minutter
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
