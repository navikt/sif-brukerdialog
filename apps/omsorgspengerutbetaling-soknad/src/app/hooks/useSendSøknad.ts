import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OmsorgspengerutbetalingSNFriApp } from '@navikt/sif-app-register';
import { getInnsendingService, InnsendingType } from '@navikt/sif-common';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { AxiosError } from 'axios';
import { mellomlagringService } from '../api/mellomlagringService';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';

const innsendingService = getInnsendingService<SøknadApiData>(InnsendingType.omsorgspenger_utbetaling_snf);

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const navigateTo = useNavigate();

    const { logSoknadSent } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        innsendingService
            .send(apiData)
            .then(onSøknadSendSuccess)
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async () => {
        await logSoknadSent(OmsorgspengerutbetalingSNFriApp.navn);
        await mellomlagringService.purge();
        setIsSubmitting(false);
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
