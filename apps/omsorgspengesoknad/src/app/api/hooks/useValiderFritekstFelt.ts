import { useQuery } from '@tanstack/react-query';
import { sifCommonQueryKeys, validerFritekst } from '@navikt/sif-common-query';

/**
 * Hook for å validere fritekstfelt på oppsummeringssiden
 *
 * @param fritekstFelt - Fritekstfeltet som skal valideres (kan være undefined)
 * @param enabled - Om query skal kjøre (default: true)
 * @returns TanStack Query result med valideringsresultat
 */
export const useValiderFritekstFelt = (fritekst?: string, enabled = true) => {
    return useQuery({
        queryKey: [...sifCommonQueryKeys.validerFritekst, fritekst],
        queryFn: () => validerFritekst({ verdi: fritekst! }),
        enabled: enabled && !!fritekst && fritekst.trim().length > 0,
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};
