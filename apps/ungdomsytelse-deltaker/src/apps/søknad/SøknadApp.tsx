import { Theme } from '@navikt/ds-react';
import { Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ApiErrorKey, useAnalyticsInstance } from '../../analytics/analytics';
import { useDeltakerContext } from '../../hooks/useDeltakerContext';
import { useAppIntl } from '../../i18n';
import HentDeltakerErrorPage from '../../pages/HentDeltakerErrorPage';
import IngenSendSøknadOppgave from '../../pages/IngenSendSøknadOppgave';
import UngLoadingPage from '../../pages/UngLoadingPage';
import { AppRoutes } from '../../utils/AppRoutes';
import { SøknadProvider } from './context/SøknadContext';
import { useBarn } from './hooks/api/useBarn';
import { useKontonummer } from './hooks/api/useKontonummer';
import SøknadRouter from './SøknadRouter';
import { HarKontonummerEnum } from './steg/oppsummering/oppsummeringUtils';
import { KontonummerOppslagInfo } from './types';
import { formaterKontonummer } from './utils/formaterKontonummer';

const SøknadApp = () => {
    const { søker, deltakelsePeriode } = useDeltakerContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const kontonummer = useKontonummer();
    const barn = useBarn();
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

    const getKontonummerInfo = (): KontonummerOppslagInfo => {
        if (kontonummer.error) {
            return {
                harKontonummer: HarKontonummerEnum.UVISST,
            };
        }

        return kontonummer.data?.harKontonummer && kontonummer.data.kontonummer
            ? {
                  harKontonummer: HarKontonummerEnum.JA,
                  kontonummerFraRegister: kontonummer.data.kontonummer,
                  formatertKontonummer: formaterKontonummer(kontonummer.data.kontonummer),
              }
            : {
                  harKontonummer: HarKontonummerEnum.NEI,
              };
    };

    const søknadOppgave = deltakelsePeriode.oppgaver.find((o) => o.oppgavetype === Oppgavetype.SØK_YTELSE);

    if (!søknadOppgave) {
        return <IngenSendSøknadOppgave />;
    }

    return (
        <Theme hasBackground={__IS_VEILEDER_DEMO__ ? false : true}>
            <SøknadProvider
                søknadOppgave={søknadOppgave}
                søker={søker}
                deltakelsePeriode={deltakelsePeriode}
                kontonummerInfo={getKontonummerInfo()}
                barn={barn.data || []}>
                <SøknadRouter />
            </SøknadProvider>
        </Theme>
    );
};

export default SøknadApp;
