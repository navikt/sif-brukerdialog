import { useQuery } from '@tanstack/react-query';

import { hentSisteGyldigeVedtakForAktørId } from '../../api/omsorgsdager-kronisk-sykt-barn/hentSisteGyldigeVedtakForAktorId';
import { sifApiQueryKeys } from '../../queryKeys';
import { SisteGyldigeVedtakForAktørId } from '../../types/omsorgsdager-kronisk-sykt-barn/SisteGyldigeVedtakForAktorId';
import { ApiError } from '../../utils/errorHandlers';

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
