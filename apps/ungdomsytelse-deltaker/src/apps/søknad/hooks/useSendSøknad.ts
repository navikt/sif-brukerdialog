import { useState } from 'react';
import { deltakerService, SendSøknadDTO } from '@navikt/ung-common';

export const useSendSøknad = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [søknadSendt, setSøknadSendt] = useState(false);

    const sendSøknad = (søknad: SendSøknadDTO) => {
        setPending(true);
        return deltakerService
            .sendSøknad(søknad)
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
