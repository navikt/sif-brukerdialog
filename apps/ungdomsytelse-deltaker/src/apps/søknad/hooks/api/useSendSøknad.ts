import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '@shared/api/queries/commonQueries';
import { sendSøknad } from '@søknad/api/søknad/sendSøknad';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSendSøknad = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, ungdomsytelse.Ungdomsytelsesøknad>({
        mutationFn: (data) => sendSøknad(data),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
    });
};
