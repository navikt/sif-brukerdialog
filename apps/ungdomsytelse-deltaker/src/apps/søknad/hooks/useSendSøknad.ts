import { useState } from 'react';
import { deltakerService } from '../../../api/services/deltakerService';
import { SendSøknadApiData } from '../../../api/schemas/sendSøknadDto';

export const useSendSøknad = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [søknadSendt, setSøknadSendt] = useState(false);

    const sendSøknad = (deltakelseId: string, apiData: SendSøknadApiData) => {
        setPending(true);
        return deltakerService
            .sendSøknad(deltakelseId, apiData)
            .then(() => {
                setSøknadSendt(true);
            })
            .catch((error) => {
                setError('Søknad feilet');
                console.log(error);
            })
            .finally(() => {
                setPending(false);
            });
    };
    return { sendSøknad, søknadSendt, pending, error };
};
