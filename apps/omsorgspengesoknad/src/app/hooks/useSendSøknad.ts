import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OmsorgsdagerKroniskApp } from '@navikt/sif-app-register';
import { useAnalyticsInstance } from '@navikt/sif-common-analytics';
import { AxiosError } from 'axios';
import søknadEndpoint from '../api/endpoints/søknadEndpoint';
import { useMellomlagring } from './useMellomlagring';
import { useAppIntl } from '../i18n';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const useSendSøknad = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { locale } = useAppIntl();
    const { slettMellomlagring } = useMellomlagring();
    const navigateTo = useNavigate();

    const { logSoknadSent } = useAnalyticsInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        søknadEndpoint
            .send(apiData)
            .then(onSøknadSendSuccess)
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async () => {
        await logSoknadSent(OmsorgsdagerKroniskApp.key, locale);
        slettMellomlagring();
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
