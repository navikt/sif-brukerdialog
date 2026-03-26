import { ApiError } from '@navikt/ung-common';
import { useMutation } from '@tanstack/react-query';

import { sendSøknad } from '../api/sendSoknad';
import { SøknadApiData } from '../types/SøknadApiData';

export const useSendSøknad = () => {
    return useMutation<void, ApiError, SøknadApiData>({
        mutationFn: (data) => sendSøknad(data),
    });
};
