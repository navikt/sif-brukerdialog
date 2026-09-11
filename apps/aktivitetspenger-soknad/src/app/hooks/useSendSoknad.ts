import { ApiError } from '@sif/api';
import { useMutation } from '@tanstack/react-query';

import { sendSøknad } from '@app/api/sendSoknad';
import { SøknadApiData } from '@app/types/SoknadApiData';

export const useSendSøknad = () => {
    return useMutation<void, ApiError, SøknadApiData>({
        mutationFn: (data) => sendSøknad(data),
    });
};
