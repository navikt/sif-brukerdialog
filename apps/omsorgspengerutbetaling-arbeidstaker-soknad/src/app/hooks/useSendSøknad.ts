import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OmsorgspengerutbetalingArbeidstakerApp } from '@navikt/sif-app-register';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { getInnsendingService, InnsendingType } from '@navikt/sif-common-api';
import { AxiosError } from 'axios';
import { mellomlagringService } from '../api/mellomlagringService';
import { useAppIntl } from '../i18n';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const useSendSøknad = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { locale } = useAppIntl();
    const navigateTo = useNavigate();

    const { logSoknadSent } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        getInnsendingService(InnsendingType.omsorgspenger_utbetaling_arbeidstaker)
            .send(apiData)
            .then(() => onSøknadSendSuccess())
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async () => {
        await logSoknadSent(OmsorgspengerutbetalingArbeidstakerApp.key, locale);
        mellomlagringService.purge();
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
