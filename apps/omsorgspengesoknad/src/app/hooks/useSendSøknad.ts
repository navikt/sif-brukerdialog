import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import søknadEndpoint from '../api/endpoints/søknadEndpoint';
import { useMellomlagring } from '../hooks/useMellomlagring';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import { SKJEMANAVN } from '../App';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { slettMellomlagring } = useMellomlagring();
    const navigateTo = useNavigate();

    const { logSoknadSent, logSoknadFailed } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        resetSendSøknad();
        søknadEndpoint
            .send(apiData)
            .then(async () => {
                await logSoknadSent(SKJEMANAVN);
                slettMellomlagring();
                setIsSubmitting(false);
                dispatch(actionsCreator.setSøknadSendt());
                navigateTo(SøknadRoutes.SØKNAD_SENDT);
            })
            .catch(async (error) => {
                await logSoknadFailed('Ved innsending av søknad');
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
