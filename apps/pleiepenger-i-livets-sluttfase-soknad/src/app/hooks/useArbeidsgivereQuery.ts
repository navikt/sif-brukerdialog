import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { useQuery } from '@tanstack/react-query';

import { appArbeidsgivereService } from '../api/appArbeidsgiverService';
import { Arbeidsgiver } from '../types/Arbeidsgiver';

export const queryKeys = {
    arbeidsgivere: (periode?: DateRange) =>
        ['arbeidsgivere', periode ? dateRangeToISODateRange(periode) : undefined] as const,
};

export const useArbeidsgivereQuery = (periode?: DateRange, enabled = true) => {
    return useQuery<Arbeidsgiver[], Error>({
        queryKey: queryKeys.arbeidsgivere(periode),
        queryFn: () => {
            if (!periode) {
                throw new Error('Periode is required');
            }
            return appArbeidsgivereService.fetch(periode);
        },
        staleTime: 1000 * 60 * 20, // 20 minutter
        enabled: enabled && !!periode,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
