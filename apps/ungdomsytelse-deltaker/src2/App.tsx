import { Suspense, use, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { fetchInitialData } from './api/dataFetchers';
import LoadingPage from './components/LoadingPage';
import { useAppStore } from './store/useAppStore';
import './app.css';

function DataLoader() {
    const setInitialData = useAppStore((state) => state.setInitialData);
    const data = use(fetchInitialData());

    useEffect(() => {
        setInitialData(data);
    }, [data, setInitialData]);

    return null;
}

function MainContent() {
    const { søker, deltakelser, deltakelse } = useAppStore();

    if (deltakelser.length === 0) {
        return (
            <Page title="Du har ikke tilgang til denne tjenesten">
                <center>Ingen deltakelser funnet</center>
            </Page>
        );
    }

    if (deltakelser.length > 1) {
        return (
            <Page title="Du har ikke tilgang til denne tjenesten">
                <center>Flere enn én deltakelse funnet</center>
            </Page>
        );
    }

    return (
        <div>
            <h2>Søker</h2>
            <pre>{JSON.stringify(søker, null, 2)}</pre>

            <h2>Deltakelser</h2>
            <pre>{JSON.stringify(deltakelser, null, 2)}</pre>

            <h2>Deltakelse</h2>
            <pre>{JSON.stringify(deltakelse, null, 2)}</pre>
        </div>
    );
}

function App() {
    return (
        <>
            <Suspense fallback={<LoadingPage />}>
                <ErrorBoundary fallback={<div>Noe gikk galt</div>}>
                    <DataLoader />
                    <MainContent />
                </ErrorBoundary>
            </Suspense>
        </>
    );
}

export default App;
