import { useState } from 'react';
import { AxiosError } from 'axios';
import { sendSøknadService } from '../../api/services/sendSøknadService';
import { SøknadApiData } from '../../api/types';

export const useSendSøknad = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const [søknadSendt, setSøknadSendt] = useState(false);

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        sendSøknadService
            .sendSøknad(apiData)
            .then(onSøknadSendSuccess)
            .catch((error) => {
                setSøknadSendt(false);
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async () => {
        setSøknadSendt(true);
        setIsSubmitting(false);
    };

    const resetSendSøknad = () => {
        setSøknadSendt(false);
        setIsSubmitting(false);
        setSendSøknadError(undefined);
    };

    return {
        resetSendSøknad,
        sendSøknad,
        isSubmitting,
        søknadSendt,
        sendSøknadError,
    };
};
