import { useState } from 'react';
import { deltakerApiService } from '@navikt/ung-common';
import { ApiErrorObject } from '@navikt/ung-common/src/utils/errorHandlers';
import { SendSøknadDTO } from '@navikt/ung-common/src/types/dto/SendSøknadDTO';

export const useSendSøknad = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<ApiErrorObject | undefined>();
    const [søknadSendt, setSøknadSendt] = useState(false);

    const sendSøknad = async (søknad: SendSøknadDTO) => {
        setError(undefined);
        setPending(true);
        try {
            await deltakerApiService.sendSøknad(søknad);
            setSøknadSendt(true);
        } catch (e) {
            setError(e);
            throw e;
        } finally {
            setPending(false);
        }
    };
    return { sendSøknad, søknadSendt, pending, error };
};
