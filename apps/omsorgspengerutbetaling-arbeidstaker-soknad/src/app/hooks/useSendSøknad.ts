import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OmsorgspengerutbetalingArbeidstakerApp } from '@navikt/sif-app-register';
import { getInnsendingService, InnsendingType } from '@navikt/sif-common';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { AxiosError } from 'axios';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { ArbeidsgiverDetaljer, SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { mellomlagringService } from '../api/mellomlagringService';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const navigateTo = useNavigate();

    const { logSoknadSent } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        getInnsendingService(InnsendingType.omsorgspenger_utbetaling_arbeidstaker)
            .send(apiData)
            .then(() => onSøknadSendSuccess(apiData.arbeidsgivere))
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async (arbeidsgivere: ArbeidsgiverDetaljer[]) => {
        await logSoknadSent(OmsorgspengerutbetalingArbeidstakerApp.navn);
        mellomlagringService.purge();
        setIsSubmitting(false);
        dispatch(actionsCreator.setSøknadKvitteringInfo(arbeidsgivere));
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
