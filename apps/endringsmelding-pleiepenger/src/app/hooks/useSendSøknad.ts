import { useSøknadContext } from '@app/hooks';
import { ArbeidsaktivitetArbeidstaker, ArbeidstidApiData, SøknadApiData } from '@app/types';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { useAnalyticsInstance } from '@navikt/sif-common-analytics';
import { InvalidParameterViolation } from '@navikt/sif-common-api';
import { getInvalidParametersFromAxiosError } from '@navikt/sif-common-soknad-ds';
import { appLogger } from '@sif/apm';
import { AxiosError, isAxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendSøknadEndpoint } from '../api/endpoints/sendSøknadEndpoint';
import { useAppIntl } from '../i18n';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import actionsCreator from '../søknad/context/action/actionCreator';
import { getSøknadApiDataMetadata, SøknadApiDataMetadata } from '../utils/oppsummeringUtils';
import { useMellomlagring } from './useMellomlagring';

const erPeriodeParameterFeil = (violation: InvalidParameterViolation) => {
    return violation.parameterName.startsWith('ytelse.arbeidstid.arbeidstakerList[0].perioder');
};

const logDebugInfoHvisPeriodefeil = (
    error: AxiosError,
    arbeidstid: ArbeidstidApiData,
    arbeidsaktivitetArbeidstaker: ArbeidsaktivitetArbeidstaker[],
) => {
    const periodefeil = getInvalidParametersFromAxiosError(error).filter(erPeriodeParameterFeil);
    const arbeidstakerInnsending = arbeidstid.arbeidstakerList[0];
    if (!arbeidstakerInnsending || periodefeil.length === 0) {
        return;
    }

    const arbeidstakerSak = arbeidsaktivitetArbeidstaker.find(
        ({ arbeidsgiver }) => arbeidsgiver.organisasjonsnummer === arbeidstakerInnsending.organisasjonsnummer,
    );

    appLogger.logHandledException('Innsending feilet - periodeparameterfeil', {
        violations: periodefeil.map(({ parameterName, reason }) => ({ parameterName, reason })),
        perioderInnsending: JSON.stringify(Object.keys(arbeidstakerInnsending.arbeidstidInfo.perioder)),
        periodeKeysSak: JSON.stringify(Object.keys(arbeidstakerSak?.perioderMedArbeidstid ?? {})),
    });
};

const logDebugInnsendingParameterViolations = (error: AxiosError) => {
    const violations = getInvalidParametersFromAxiosError(error);
    const violationsFormatted = violations
        .map(({ parameterName, reason }, index) => `Feil ${index + 1}: ${parameterName} - ${reason}`)
        .join(', ');
    appLogger.logHandledException(`Innsending feilet - parameterfeil: ${violationsFormatted}`);
};

export const useSendSøknad = () => {
    const {
        dispatch,
        state: { sak, søknadsdata, valgteEndringer },
    } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sendSøknadError, setSendSøknadError] = useState<AxiosError | undefined>();
    const { slettMellomlagring } = useMellomlagring();
    const { locale } = useAppIntl();
    const navigateTo = useNavigate();

    const { logSoknadSent, logSoknadFailed, logInfo } = useAnalyticsInstance();

    const sendSøknad = (apiData: SøknadApiData) => {
        setIsSubmitting(true);
        sendSøknadEndpoint
            .send(apiData)
            .then(async () => onSøknadSendSuccess(getSøknadApiDataMetadata(apiData, søknadsdata, valgteEndringer, sak)))
            .catch((error) => {
                if (isAxiosError(error)) {
                    appLogger.logApiError(error, 'Innsending feilet');
                    if (valgteEndringer.arbeidstid && apiData.ytelse.arbeidstid) {
                        logDebugInnsendingParameterViolations(error);
                        logDebugInfoHvisPeriodefeil(
                            error,
                            apiData.ytelse.arbeidstid,
                            sak.arbeidsaktiviteter.arbeidstakerAktiviteter,
                        );
                    }
                }
                logSoknadFailed(EndringsmeldingPsbApp.navn);
                setSendSøknadError(error);
                setIsSubmitting(false);
            });
    };

    const onSøknadSendSuccess = async (metadata: SøknadApiDataMetadata) => {
        await logSoknadSent(EndringsmeldingPsbApp.key, locale);
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
