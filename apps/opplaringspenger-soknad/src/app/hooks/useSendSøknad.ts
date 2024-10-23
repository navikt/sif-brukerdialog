import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { AxiosError } from 'axios';
import { OpplæringspengerApp } from '@navikt/sif-app-register';
import { useMellomlagring } from '../hooks/useMellomlagring';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import søknadEndpoint from '../api/endpoints/søknadEndpoint';
import { getKvitteringInfoFromApiData } from '../utils/kvitteringUtils';
import { Søker } from '../types/Søker';
import { KvitteringInfo } from '../types/KvitteringInfo';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { slettMellomlagring } = useMellomlagring();
    const navigateTo = useNavigate();

    const { logSoknadSent } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData, søker: Søker) => {
        setIsSubmitting(true);
        søknadEndpoint
            .send(apiData)
            .then(() => {
                const kvitteringInfo = getKvitteringInfoFromApiData(apiData, søker);
                onSøknadSendSuccess(kvitteringInfo);
            })
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async (kvitteringInfo?: KvitteringInfo) => {
        await logSoknadSent(OpplæringspengerApp.key);
        slettMellomlagring();
        setIsSubmitting(false);
        if (kvitteringInfo) {
            dispatch(actionsCreator.setSøknadKvitteringInfo(kvitteringInfo));
        }

        dispatch(actionsCreator.setSøknadSendt());
        navigateTo(SøknadRoutes.SØKNAD_SENDT);
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
