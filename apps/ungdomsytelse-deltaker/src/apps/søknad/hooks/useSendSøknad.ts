import { useState } from 'react';
import { Ungdomsytelsesøknad } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiErrorObject } from '@navikt/ung-common';
import { deltakerApiService } from '../../../api/deltakerApiService';

export const useSendSøknad = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<ApiErrorObject | undefined>();
    const [søknadSendt, setSøknadSendt] = useState(false);

    const sendSøknad = async (søknad: Ungdomsytelsesøknad) => {
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
