import { Page } from '@navikt/ds-react';
import { IntlProvider } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import { initApiClient } from '@navikt/ung-common';
import AppHeader from './components/AppHeader';
import DeltakerPage from './components/DeltakerPage';
import { VeilederProvider } from './context/VeilederContext';
import { appMessages } from './i18n';
import StartPage from './pages/start-page/StartPage';
import './app.css';
import { useState } from 'react';
import { fetchSøker } from '@navikt/sif-common-api';
import { getZodErrorsInfo } from './utils/zodUtils';
import { Veileder } from './types/Veileder';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useEffectOnce } from '@navikt/sif-common-hooks';

initApiClient();

const App = () => {
    const [veileder, setVeileder] = useState<Veileder>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffectOnce(() => {
        const fetchVeileder = async () => {
            setError(undefined);
            try {
                const veileder = await fetchSøker();
                setVeileder(veileder);
            } catch (e) {
                setError(e);
                getZodErrorsInfo(e);
            } finally {
                setLoading(false);
            }
        };
        fetchVeileder();
    });

    if (loading) {
        return (
            <Page className="bg-gray-500">
                <LoadingSpinner />
            </Page>
        );
    }
    if (error || !veileder) {
        return <Page className="bg-gray-500">Det oppstod en feil under henting av veileder</Page>;
    }

    return (
        <VeilederProvider veileder={veileder}>
            <IntlProvider locale="nb" messages={appMessages.nb}>
                <AppHeader />
                <Page className="bg-gray-500">
                    <Routes>
                        <Route path="" element={<StartPage />}></Route>
                        <Route path="deltaker/:deltakerId" element={<DeltakerPage />} />
                    </Routes>
                </Page>
            </IntlProvider>
        </VeilederProvider>
    );
};

export default App;
