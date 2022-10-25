import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { SøknadApiData } from '../types/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { useMellomlagring } from '../hooks/useMellomlagring';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError] = useState<AxiosError | undefined>();
    const { slettMellomlagring } = useMellomlagring();
    const navigateTo = useNavigate();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        slettMellomlagring();
        dispatch(actionsCreator.setSøknadSendt());
        setIsSubmitting(false);
        navigateTo(SøknadRoutes.SØKNAD_SENDT);
    };

    return {
        sendSøknad,
        isSubmitting,
        sendSøknadError,
    };
};
