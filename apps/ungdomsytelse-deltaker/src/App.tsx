import { ErrorBoundary } from 'react-error-boundary';
import { DeltakerProvider } from './context/DeltakerContext';
import Deltaker from './Deltaker';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
import './app.css';

function App() {
    return (
        <ErrorBoundary fallback={<div>Noe gikk galt</div>}>
            <AppIntlMessageProvider>
                <DeltakerProvider>
                    <Deltaker />
                </DeltakerProvider>
            </AppIntlMessageProvider>
        </ErrorBoundary>
    );
}

export default App;
