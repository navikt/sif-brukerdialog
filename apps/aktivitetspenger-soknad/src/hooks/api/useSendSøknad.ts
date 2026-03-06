import { ApiError } from '@navikt/sif-common-query';
import { useMutation } from '@tanstack/react-query';

import { sendSøknad } from '../../api/søknad/sendSøknad';
import { SøknadApiData } from '../../søknad/types/SøknadApiData';

export const useSendSøknad = () => {
    return useMutation<void, ApiError, SøknadApiData>({
        mutationFn: (data) => sendSøknad(data),
    });
};
