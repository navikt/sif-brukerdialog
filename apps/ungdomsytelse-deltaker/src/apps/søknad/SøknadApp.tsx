import { Theme } from '@navikt/ds-react';
import { useRegistrerteBarn, useYtelseMellomlagring } from '@sif/api/k9-prosessering';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { kontonummerFallback, useKontonummer } from '@sif/api/ung-deltaker';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ApiErrorKey, useAnalyticsInstance } from '../../analytics/analytics';
import { useDeltakerContext } from '../../hooks/useDeltakerContext';
import { useAppIntl } from '../../i18n';
import HentDeltakerErrorPage from '../../pages/HentDeltakerErrorPage';
import IngenSendSøknadOppgave from '../../pages/IngenSendSøknadOppgave';
import UngLoadingPage from '../../pages/UngLoadingPage';
import { AppRoutes } from '../../utils/AppRoutes';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from './setup/constants';
import { MellomlagringMetaData, SøknadMellomlagring } from './setup/types/Mellomlagring';
import { Features } from '../../utils/Features';
import Søknad from './Søknad';

const SøknadApp = () => {
    const { søker, deltakelsePeriode, oppgaver } = useDeltakerContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const kontonummer = useKontonummer();
    const barn = useRegistrerteBarn();
    const { text } = useAppIntl();
    const { logApiError } = useAnalyticsInstance();

    const mellomlagringMetadata = useMemo<MellomlagringMetaData | undefined>(() => {
        if (!Features.useMellomlagring) return undefined;
        if (!barn.isFetched || !barn.data) return undefined;
        return {
            MELLOMLAGRING_VERSJON,
            søker,
            barn: barn.data,
        };
    }, [barn.isFetched, barn.data, søker]);

    const mellomlagring = useYtelseMellomlagring<SøknadMellomlagring, MellomlagringMetaData>(
        APP_YTELSE,
        mellomlagringMetadata,
    );

    const { søktTidspunkt } = deltakelsePeriode;
    useEffect(() => {
        if (deltakelsePeriode.søktTidspunkt !== undefined && !pathname.includes('kvittering')) {
            navigate(AppRoutes.innsyn);
        }
    }, [søktTidspunkt, pathname]);

    if (barn.isLoading || kontonummer.isLoading || (mellomlagringMetadata && mellomlagring.isLoading)) {
        return <UngLoadingPage />;
    }

    if (barn.isError) {
        const { context, message, type } = barn.error;
        logApiError(ApiErrorKey.barn, { error: { context, message, type } });
        return <HentDeltakerErrorPage error={text('søknadApp.loading.error')} />;
    }

    const søknadOppgave = oppgaver.find((o) => o.parsedOppgavetype === ParsedOppgavetype.SØK_YTELSE);

    if (!søknadOppgave) {
        return <IngenSendSøknadOppgave />;
    }

    const mellomlagringData = mellomlagring.data ?? undefined;

    return (
        <Theme hasBackground={!__IS_VEILEDER_DEMO__}>
            <Søknad
                søker={søker}
                barn={barn.data || []}
                kontonummerInfo={kontonummer.data || kontonummerFallback}
                søknadOppgave={søknadOppgave}
                mellomlagring={mellomlagringData}
            />
        </Theme>
    );
};

export default SøknadApp;
