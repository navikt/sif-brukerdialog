import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OmsorgspengerutbetalingSNFriApp } from '@navikt/sif-app-register';
import { getInnsendingService, InnsendingType } from '@navikt/sif-common-api';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { AxiosError } from 'axios';
import { mellomlagringService } from '../api/mellomlagringService';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { useAppIntl } from '../i18n';

const innsendingService = getInnsendingService<SøknadApiData>(InnsendingType.omsorgspenger_utbetaling_snf);

export const useSendSøknad = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { locale } = useAppIntl();
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
        await logSoknadSent(OmsorgspengerutbetalingSNFriApp.key, locale);
        await mellomlagringService.purge();
        setIsSubmitting(false);

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
