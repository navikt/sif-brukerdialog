import { useQueries } from '@tanstack/react-query';

import { RegistrertBarn } from '../../k9-brukerdialog-prosessering/registrert-barn/RegistrertBarn';
import { sifApiQueryKeys } from '../../queryKeys';
import { SisteGyldigeVedtakForAktørId } from './SisteGyldigeVedtakForAktorId';
import { hentSisteGyldigeVedtakForAktørId } from './vedtakApi';

export interface InnvilgedeVedtak {
    [aktørId: string]: SisteGyldigeVedtakForAktørId | undefined;
}

export const useInnvilgedeVedtakForRegistrerteBarn = (
    registrerteBarn: RegistrertBarn[],
): { vedtak: InnvilgedeVedtak; isLoading: boolean } => {
    const queries = useQueries({
        queries: registrerteBarn.map((barn) => ({
            queryKey: sifApiQueryKeys.sisteGyldigeVedtakForAktørId(barn.aktørId),
            queryFn: (): Promise<SisteGyldigeVedtakForAktørId> => hentSisteGyldigeVedtakForAktørId(barn.aktørId),
            staleTime: 1000 * 60 * 20,
            retry: 1,
            refetchOnWindowFocus: false,
        })),
    });

    const isLoading = registrerteBarn.length > 0 && queries.some((q) => q.isPending);

    const vedtak: InnvilgedeVedtak = {};
    registrerteBarn.forEach((barn, index) => {
        vedtak[barn.aktørId] = queries[index]?.data;
    });

    return { vedtak, isLoading };
};
