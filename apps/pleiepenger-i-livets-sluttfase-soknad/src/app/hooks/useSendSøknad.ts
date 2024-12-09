import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PleiepengerLivetsSluttApp } from '@navikt/sif-app-register';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { getInnsendingService, InnsendingType } from '@navikt/sif-common-api';
import { AxiosError } from 'axios';
import { mellomlagringService } from '../api/mellomlagringService';
import { useAppIntl } from '../i18n';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { KvitteringInfo } from '../types/KvitteringInfo';
import { Søker } from '../types/Søker';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { getKvitteringInfoFromApiData } from '../utils/kvitteringUtils';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { locale } = useAppIntl();
    const navigateTo = useNavigate();

    const { logSoknadSent } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData, søker: Søker) => {
        setIsSubmitting(true);
        getInnsendingService(InnsendingType.pleiepenger_i_livets_sluttfase)
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
        await logSoknadSent(PleiepengerLivetsSluttApp.key, locale);
        mellomlagringService.purge();
        setIsSubmitting(false);
        if (kvitteringInfo) {
            dispatch(actionsCreator.setSøknadKvitteringInfo(kvitteringInfo));
        }
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
