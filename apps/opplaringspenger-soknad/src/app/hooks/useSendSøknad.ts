import { OpplæringspengerApp } from '@navikt/sif-app-register';
import { useAnalyticsInstance } from '@navikt/sif-common-analytics';
import { getInnsendingService, InnsendingType } from '@navikt/sif-common-api';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mellomlagringService } from '../api/mellomlagringService';
import { useAppIntl } from '../i18n';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { EnkeltdagEllerPeriode } from '../søknad/steps/kurs/KursStepForm';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { locale } = useAppIntl();
    const navigateTo = useNavigate();

    const { logSoknadSent, logInfo } = useAnalyticsInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        getInnsendingService(InnsendingType.opplaringspenger)
            .send(apiData)
            .then(() => {
                const søknadMeta = getSendtSøknadMetadata(apiData);
                onSøknadSendSuccess(søknadMeta);
            })
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async (metadata: SendtSøknadMetadata) => {
        await logSoknadSent(OpplæringspengerApp.key, locale);
        await logInfo(metadata);
        await mellomlagringService.purge();
        setIsSubmitting(false);
        dispatch(actionsCreator.setSøknadSendt());
        navigateTo(SøknadRoutes.SØKNAD_SENDT);
    };

    return {
        sendSøknad,
        isSubmitting,
        sendSøknadError,
    };
};

interface SendtSøknadMetadata {
    enkeltdagEllerPeriode: EnkeltdagEllerPeriode;
    antallEnkeltdager: number;
    antallPerioder: number;
    antallReisedager?: number;
    antallFerieperioder: number;
}

const getSendtSøknadMetadata = (apiData: SøknadApiData): SendtSøknadMetadata => {
    return {
        enkeltdagEllerPeriode: apiData.kurs.enkeltdagEllerPeriode,
        antallEnkeltdager: apiData.kurs.kursdager.length,
        antallPerioder: apiData.kurs.kursperioder.length,
        antallReisedager: apiData.kurs.reise?.reiserUtenforKursdager ? apiData.kurs.reise.reisedager.length : 0,
        antallFerieperioder: apiData.ferieuttakIPerioden?.skalTaUtFerieIPerioden
            ? apiData.ferieuttakIPerioden.ferieuttak.length
            : 0,
    };
};
