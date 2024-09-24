import { useState } from 'react';
import { AxiosError } from 'axios';
import { sendSøknadService } from '../../api/services/sendSøknadService';
import { SøknadApiData } from '../../api/types';

export const useSendSøknad = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        sendSøknadService
            .sendSøknad(apiData)
            .then(onSøknadSendSuccess)
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async () => {
        setIsSubmitting(false);
    };

    const resetSendSøknad = () => {
        setIsSubmitting(false);
        setSendSøknadError(undefined);
    };

    return {
        resetSendSøknad,
        sendSøknad,
        isSubmitting,
        sendSøknadError,
    };
};
