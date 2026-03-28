import { Theme } from '@navikt/ds-react';
import { useRegistrerteBarn } from '@sif/api/k9-prosessering';
import { kontonummerFallback, useKontonummer } from '@sif/api/ung-deltaker';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ApiErrorKey, useAnalyticsInstance } from '../../analytics/analytics';
import { useDeltakerContext } from '../../hooks/useDeltakerContext';
import { useAppIntl } from '../../i18n';
import HentDeltakerErrorPage from '../../pages/HentDeltakerErrorPage';
import IngenSendSøknadOppgave from '../../pages/IngenSendSøknadOppgave';
import UngLoadingPage from '../../pages/UngLoadingPage';
import { ParsedOppgavetype } from '../../types/Oppgave';
import { AppRoutes } from '../../utils/AppRoutes';
import { SøknadProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';
const SøknadApp = () => {
    const { søker, deltakelsePeriode, oppgaver } = useDeltakerContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const kontonummer = useKontonummer();
    const barn = useRegistrerteBarn();
    const { text } = useAppIntl();
    const { logApiError } = useAnalyticsInstance();

    const { søktTidspunkt } = deltakelsePeriode;
    useEffect(() => {
        if (deltakelsePeriode.søktTidspunkt !== undefined && !pathname.includes('kvittering')) {
            navigate(AppRoutes.innsyn);
        }
    }, [søktTidspunkt, pathname]);

    if (barn.isLoading || kontonummer.isLoading) {
        return <UngLoadingPage />;
    }

    if (barn.isError) {
        const { context, message, type } = barn.error;
        logApiError(ApiErrorKey.barn, { error: { context, message, type } });
        return <HentDeltakerErrorPage error={text('søknadApp.loading.error')} />;
    }

    const søknadOppgave = oppgaver.find((o) => o.oppgavetype === ParsedOppgavetype.SØK_YTELSE);

    if (!søknadOppgave) {
        return <IngenSendSøknadOppgave />;
    }

    return (
        <Theme hasBackground={!__IS_VEILEDER_DEMO__}>
            <SøknadProvider
                søknadOppgave={søknadOppgave}
                søker={søker}
                deltakelsePeriode={deltakelsePeriode}
                oppgaver={oppgaver}
                kontonummerInfo={kontonummer.data || kontonummerFallback}
                barn={barn.data || []}>
                <SøknadRouter />
            </SøknadProvider>
        </Theme>
    );
};

export default SøknadApp;
