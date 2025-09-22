import { rapporterInntekt } from '@innsyn/api/inntekt/rapporterInntekt';
import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '@shared/api/queries/commonQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logApiErrorFaro } from '../../utils/apiErrorLogger';

export const useRapporterInntekt = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, ungdomsytelse.UngdomsytelseInntektsrapportering>({
        mutationFn: (data) => rapporterInntekt(data),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
        onError: (error) => logApiErrorFaro('useRapporterInntekt', error),
    });
};
