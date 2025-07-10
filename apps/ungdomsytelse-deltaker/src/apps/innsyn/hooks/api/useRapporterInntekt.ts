import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '../../../../api/queries/commonQueries';
import { rapporterInntekt } from '../../api/inntekt/rapporterInntekt';

export const useRapporterInntekt = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, ungdomsytelse.UngdomsytelseInntektsrapportering>({
        mutationFn: (data) => rapporterInntekt(data),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
    });
};
