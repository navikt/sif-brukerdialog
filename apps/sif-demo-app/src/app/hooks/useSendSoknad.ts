import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { useMutation } from '@tanstack/react-query';

import { sendSøknad } from '../api/sendSoknad';

export const useSendSøknad = () => {
    return useMutation<void, ApiError, aktivitetspenger.Aktivitetspengersøknad>({
        mutationFn: (data) => sendSøknad(data),
    });
};
