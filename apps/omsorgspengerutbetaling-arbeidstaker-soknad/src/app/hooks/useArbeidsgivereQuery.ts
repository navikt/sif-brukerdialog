import { Arbeidsgivere, fetchArbeidsgivere } from '@navikt/sif-common-api';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { useQuery } from '@tanstack/react-query';

export const queryKeys = {
    arbeidsgivere: (periode?: DateRange) =>
        ['arbeidsgivere', periode ? dateRangeToISODateRange(periode) : undefined] as const,
};

export const useArbeidsgivereQuery = (periode?: DateRange, enabled = true) => {
    return useQuery<Arbeidsgivere, Error>({
        queryKey: queryKeys.arbeidsgivere(periode),
        queryFn: () => {
            if (!periode) {
                throw new Error('Periode is required');
            }
            return fetchArbeidsgivere({ periode });
        },
        staleTime: 1000 * 60 * 20, // 20 minutter
        enabled: enabled && !!periode,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
