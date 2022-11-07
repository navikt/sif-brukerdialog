import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { sendSøknadEndpoint } from '../api/endpoints/sendSøknadEndpoint';
import { useMellomlagring } from './useMellomlagring';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { slettMellomlagring } = useMellomlagring();
    const navigateTo = useNavigate();

    const sendSøknad = (apiData: SøknadApiData) => {
        resetSendSøknad();
        sendSøknadEndpoint
            .send(apiData)
            .then(() => {
                slettMellomlagring();
                setIsSubmitting(false);
                dispatch(actionsCreator.setSøknadSendt());
                navigateTo(SøknadRoutes.SØKNAD_SENDT);
            })
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
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
