import { ApiError } from '@navikt/ung-common';
import { useMutation } from '@tanstack/react-query';

import { sendSøknad } from '../setup/api/sendSøknad';

export const useSendSøknad = () => {
    return useMutation<void, ApiError, any>({
        mutationFn: (data) => sendSøknad(data),
    });
};
