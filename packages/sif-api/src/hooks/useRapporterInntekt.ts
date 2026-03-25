import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { rapporterInntekt } from '../api/rapporterInntekt';
import { sifCommonQueryKeys } from '../queryKeys';
import { ApiError } from '../utils/errorHandlers';

export const useRapporterInntekt = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, ungdomsytelse.UngdomsytelseInntektsrapportering>({
        mutationFn: (data) => rapporterInntekt(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: sifCommonQueryKeys.oppgaver });
            /** Backend oppdateres ikke med en gang, så vi henter deltakelsesperiodene på nytt etter noen sekunder */
            setTimeout(() => {
                queryClient.refetchQueries({ queryKey: sifCommonQueryKeys.oppgaver });
            }, 3000);
        },
    });
};
