import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSøknadContext } from '@hooks';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import { SøknadApiData } from '@types';
import { appSentryLogger } from '@utils';
import { AxiosError, isAxiosError } from 'axios';
import { sendSøknadEndpoint } from '../api/endpoints/sendSøknadEndpoint';
import { SKJEMANAVN } from '../App';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import actionsCreator from '../søknad/context/action/actionCreator';
import { getSøknadApiDataMetadata, SøknadApiDataMetadata } from '../utils/oppsummeringUtils';
import { useMellomlagring } from './useMellomlagring';

export const useSendSøknad = () => {
    const {
        dispatch,
        state: { sak, søknadsdata, valgteEndringer },
    } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { slettMellomlagring } = useMellomlagring();
    const navigateTo = useNavigate();

    const { logSoknadSent, logSoknadFailed, logInfo } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        sendSøknadEndpoint
            .send(apiData)
            .then(async () => onSøknadSendSuccess(getSøknadApiDataMetadata(apiData, søknadsdata, valgteEndringer, sak)))
            .catch((error) => {
                if (isAxiosError(error)) {
                    appSentryLogger.logError('Innsending feilet', error.message);
                }
                logSoknadFailed(SKJEMANAVN);
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async (metadata: SøknadApiDataMetadata) => {
        await logSoknadSent(SKJEMANAVN);
        await logInfo(metadata);
        slettMellomlagring();
        setIsSubmitting(false);
        dispatch(actionsCreator.setEndringsmeldingSendt());
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
