import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { sendSøknad } from '@søknad-setup';
import { useMutation } from '@tanstack/react-query';

export const useSendSøknad = () => {
    return useMutation<void, ApiError, aktivitetspenger.Aktivitetspengersøknad>({
        mutationFn: (data) => sendSøknad(data),
    });
};
