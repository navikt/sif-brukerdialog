import { ErrorBoundary } from 'react-error-boundary';
import { initUngDeltakelseOpplyserApiClient } from '@navikt/ung-common';
import DeltakerInfoLoader from './DeltakerInfoLoader';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
import './app.css';

initUngDeltakelseOpplyserApiClient();

function App() {
    return (
        <ErrorBoundary fallback={<div>Noe gikk galt</div>}>
            <AppIntlMessageProvider>
                <DeltakerInfoLoader />
            </AppIntlMessageProvider>
        </ErrorBoundary>
    );
}

export default App;
