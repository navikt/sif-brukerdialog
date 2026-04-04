import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonQueries } from '@shared/api/queries/commonQueries';
import { ApiError, sifApiQueryKeys } from '@sif/api';
import { sendSøknad } from '@søknad/api/søknad/sendSøknad';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSendSøknad = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, ungdomsytelse.Ungdomsytelsesøknad>({
        mutationFn: (data) => sendSøknad(data),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
            queryClient.invalidateQueries({ queryKey: sifApiQueryKeys.oppgaver });
        },
    });
};
