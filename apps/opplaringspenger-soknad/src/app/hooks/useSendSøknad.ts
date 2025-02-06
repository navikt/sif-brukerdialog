import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OpplæringspengerApp } from '@navikt/sif-app-register';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { getInnsendingService, InnsendingType, Søker } from '@navikt/sif-common-api';
import { AxiosError } from 'axios';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { KvitteringInfo } from '../types/KvitteringInfo';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { getKvitteringInfoFromApiData } from '../utils/kvitteringUtils';
import { mellomlagringService } from '../api/mellomlagringService';
import { useAppIntl } from '../i18n';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { locale } = useAppIntl();
    const navigateTo = useNavigate();

    const { logSoknadSent } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData, søker: Søker) => {
        setIsSubmitting(true);
        getInnsendingService(InnsendingType.opplaringspenger)
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
        await logSoknadSent(OpplæringspengerApp.key, locale);
        await mellomlagringService.purge();
        setIsSubmitting(false);
        if (kvitteringInfo) {
            dispatch(actionsCreator.setSøknadKvitteringInfo(kvitteringInfo));
        }

        dispatch(actionsCreator.setSøknadSendt());
        navigateTo(SøknadRoutes.SØKNAD_SENDT);
    };

    return {
        sendSøknad,
        isSubmitting,
        sendSøknadError,
    };
};
