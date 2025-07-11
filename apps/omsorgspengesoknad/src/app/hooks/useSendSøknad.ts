import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OmsorgsdagerKroniskApp } from '@navikt/sif-app-register';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { omsorgspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { useStateMellomlagring } from './useStateMellomlagring';
import { useAppIntl } from '../i18n';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { ApiError } from '@navikt/sif-common-query';

export const useSendSøknad = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<ApiError | undefined>();
    const { locale } = useAppIntl();
    const { slettMellomlagring } = useStateMellomlagring();
    const navigateTo = useNavigate();

    const { logSoknadSent } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        omsorgspenger.OmsorgspengerUtvidetRettController.innsendingOmsorgspengerKroniskSyktBarnSøknad({
            body: apiData,
            headers: {
                'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
            },
        })
            .then(onSøknadSendSuccess)
            .catch((error) => {
                console.error(error);
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
