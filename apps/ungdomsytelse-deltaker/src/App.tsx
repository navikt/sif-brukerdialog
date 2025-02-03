import { ErrorBoundary } from 'react-error-boundary';
import DeltakerInfoLoader from './DeltakerInfoLoader';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
import './app.css';

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
