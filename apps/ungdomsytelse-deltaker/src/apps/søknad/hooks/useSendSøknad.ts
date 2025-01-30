import { useState } from 'react';
import { sendSøknadService } from '../../../api/services/sendSøknadService';
import { SøknadApiData } from '../../../api/types';

export const useSendSøknad = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [søknadSendt, setSøknadSendt] = useState(false);

    const sendSøknad = (apiData: SøknadApiData) => {
        setPending(true);
        return sendSøknadService
            .sendSøknad(apiData)
            .then(() => {
                setSøknadSendt(true);
            })
            .catch((error) => {
                setError('Søknad feilet');
                throw error;
            })
            .finally(() => {
                setPending(false);
            });
    };
    return { sendSøknad, søknadSendt, pending, error };
};
