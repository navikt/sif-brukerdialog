import { ApiError } from '@sif/api';
import { useSøknadSendt } from '@sif/soknad-app';
import { useMutation } from '@tanstack/react-query';

import { sendSøknad } from '../api/sendSoknad';
import { SøknadApiData } from '../types/SoknadApiData';

export const useSendSøknad = () => {
    const { onSøknadSendt } = useSøknadSendt();

    const { mutate, isPending, error } = useMutation<void, ApiError, SøknadApiData>({
        mutationFn: (data) => sendSøknad(data),
        // Holder isPending til søknaden er markert som sendt. Se useSøknadSendt.
        onSuccess: onSøknadSendt,
    });

    return { sendSøknad: mutate, isPending, sendSøknadError: error };
};
