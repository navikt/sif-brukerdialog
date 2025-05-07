import { Alert, Box, Theme } from '@navikt/ds-react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { EnvKey, getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { initK9BrukerdialogProsesseringApiClient, initUngDeltakelseOpplyserApiClient } from '@navikt/ung-common';
import DeltakerInfoLoader from './DeltakerInfoLoader';
import DevFooter from './dev/DevFooter';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
import { appEnv } from './utils/appEnv';
import '@navikt/ds-css/darkside';
import './app.css';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';

initUngDeltakelseOpplyserApiClient({
    onUnAuthorized: () => {
        window.location.assign(getCommonEnv()[EnvKey.SIF_PUBLIC_LOGIN_URL]);
    },
});
initK9BrukerdialogProsesseringApiClient();

const getShowDemoMessage = () => {
    try {
        return __IS_GITHUB_PAGES__ === true;
    } catch {
        // do nothing
    }
};

const DemoMelding = () => {
    return (
        <PageBoundary>
            <Box marginBlock="6">
                <Alert variant="warning">OBS - Dette er en test-versjon og ikke en reell søknad.</Alert>
            </Box>
        </PageBoundary>
    );
};

function App() {
    const publicPath = getRequiredEnv('PUBLIC_PATH');

    return (
        <Theme>
            <ErrorBoundary fallback={<div>Noe gikk galt</div>}>
                <AppIntlMessageProvider>
                    <BrowserRouter basename={publicPath}>
                        {getShowDemoMessage() && <DemoMelding />}
                        <DeltakerInfoLoader />
                    </BrowserRouter>
                    {appEnv['VELG_SCENARIO'] === 'on' && <DevFooter />}
                </AppIntlMessageProvider>
            </ErrorBoundary>
        </Theme>
    );
}

export default App;
