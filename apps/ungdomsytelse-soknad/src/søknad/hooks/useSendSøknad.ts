import { useState } from 'react';
import { AxiosError } from 'axios';
import { sendSøknadService } from '../../api/services/sendSøknadService';
import { SøknadApiData } from '../../api/types';
import { deltakerService } from '../../api/services/deltakerService';

export const useSendSøknad = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const [søknadSendt, setSøknadSendt] = useState(false);

    const sendSøknad = async (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        await sendSøknadService
            .sendSøknad(apiData)
            .then(onSøknadSendSuccess)
            .catch((error) => {
                setSøknadSendt(false);
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
        await deltakerService.markerSomSøkt(apiData.søknadId);
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
