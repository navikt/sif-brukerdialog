import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Ungdomsytelsesøknad } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '../../../../api/queries/commonQueries';
import { sendSøknad } from '../../api/søknad/sendSøknad';

export const useSendSøknad = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, Ungdomsytelsesøknad>({
        mutationFn: (data) => sendSøknad(data),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
    });
};
