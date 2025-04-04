import { ErrorBoundary } from 'react-error-boundary';
import { initK9BrukerdialogProsesseringApiClient, initUngDeltakelseOpplyserApiClient } from '@navikt/ung-common';
import DeltakerInfoLoader from './DeltakerInfoLoader';
import DevFooter from './dev/DevFooter';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
import { appEnv } from './utils/appEnv';
import './app.css';

initUngDeltakelseOpplyserApiClient();
initK9BrukerdialogProsesseringApiClient();

function App() {
    return (
        <ErrorBoundary fallback={<div>Noe gikk galt</div>}>
            <AppIntlMessageProvider>
                <DeltakerInfoLoader />
                {appEnv['VELG_SCENARIO'] === 'on' && <DevFooter />}
            </AppIntlMessageProvider>
        </ErrorBoundary>
    );
}

export default App;
