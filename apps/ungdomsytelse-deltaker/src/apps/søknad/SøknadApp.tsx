import { Theme } from '@navikt/ds-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Oppgavetype } from '@navikt/ung-common';
import { useDeltakerContext } from '../../hooks/useDeltakerContext';
import HentDeltakerErrorPage from '../../pages/HentDeltakerErrorPage';
import IngenSendSøknadOppgave from '../../pages/IngenSendSøknadOppgave';
import UngLoadingPage from '../../pages/UngLoadingPage';
import { SøknadProvider } from './context/SøknadContext';
import { useBarn } from './hooks/api/useBarn';
import { useKontonummer } from './hooks/api/useKontonummer';
import SøknadRouter from './SøknadRouter';
import { AppRoutes } from '../../utils/AppRoutes';

const SøknadApp = () => {
    const { søker, deltakelsePeriode } = useDeltakerContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const kontonummer = useKontonummer();
    const barn = useBarn();

    const { søktTidspunkt } = deltakelsePeriode;
    useEffect(() => {
        if (deltakelsePeriode.søktTidspunkt !== undefined && !pathname.includes('kvittering')) {
            navigate(AppRoutes.innsyn);
            return;
        }
    }, [søktTidspunkt, pathname]);

    if (barn.isLoading || kontonummer.isLoading) {
        return <UngLoadingPage />;
    }

    if (barn.isError || kontonummer.isError) {
        const errorMessage = barn.isError ? 'Feil ved lasting av barn' : 'Feil ved lasting av kontonummer';
        return <HentDeltakerErrorPage error={errorMessage} />;
    }

    const søknadOppgave = deltakelsePeriode.oppgaver.find((o) => o.oppgavetype === Oppgavetype.SØK_YTELSE);

    if (!søknadOppgave) {
        return <IngenSendSøknadOppgave />;
    }

    return (
        <Theme>
            <SøknadProvider
                søknadOppgave={søknadOppgave}
                søker={søker}
                deltakelsePeriode={deltakelsePeriode}
                kontonummer={kontonummer.data?.harKontonummer ? kontonummer.data.kontonummer : undefined}
                barn={barn.data || []}>
                <SøknadRouter />
            </SøknadProvider>
        </Theme>
    );
};

export default SøknadApp;
