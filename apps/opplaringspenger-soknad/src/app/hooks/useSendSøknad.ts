import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OpplæringspengerApp } from '@navikt/sif-app-register';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { getInnsendingService, InnsendingType, Søker } from '@navikt/sif-common-api';
import { AxiosError } from 'axios';
import { mellomlagringService } from '../api/mellomlagringService';
import { useAppIntl } from '../i18n';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { KvitteringInfo } from '../types/KvitteringInfo';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { getKvitteringInfoFromApiData } from '../utils/kvitteringUtils';

export const useSendSøknad = () => {
    const { dispatch } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { locale } = useAppIntl();
    const navigateTo = useNavigate();

    const { logSoknadSent, logInfo } = useAmplitudeInstance();

    const sendSøknad = (apiData: SøknadApiData, søker: Søker) => {
        setIsSubmitting(true);
        getInnsendingService(InnsendingType.opplaringspenger)
            .send(apiData)
            .then(() => {
                const kvitteringInfo = getKvitteringInfoFromApiData(apiData, søker);
                const søknadMeta = getSendtSøknadMetadata(apiData);
                onSøknadSendSuccess(søknadMeta, kvitteringInfo);
            })
            .catch((error) => {
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async (metadata: SendtSøknadMetadata, kvitteringInfo?: KvitteringInfo) => {
        await logSoknadSent(OpplæringspengerApp.key, locale);
        await logInfo(metadata);
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

interface SendtSøknadMetadata {
    antallPerioder: number;
    antallReisedager: number;
    antallFerieperioder: number;
}

const getSendtSøknadMetadata = (apiData: SøknadApiData): SendtSøknadMetadata => {
    return {
        antallPerioder: apiData.kurs.kursperioder.length,
        antallReisedager: apiData.kurs.reise.reiserUtenforKursdager ? apiData.kurs.reise.reisedager.length : 0,
        antallFerieperioder: apiData.ferieuttakIPerioden?.skalTaUtFerieIPerioden
            ? apiData.ferieuttakIPerioden.ferieuttak.length
            : 0,
    };
};
