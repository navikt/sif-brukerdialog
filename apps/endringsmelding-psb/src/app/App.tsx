import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Route } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import SifAppWrapper from '@navikt/sif-common-core-ds/lib/components/sif-app-wrapper/SifAppWrapper';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import SoknadApplication from '@navikt/sif-common-soknad-ds/lib/soknad-application-setup/SoknadApplication';
import SoknadApplicationCommonRoutes from '@navikt/sif-common-soknad-ds/lib/soknad-application-setup/SoknadApplicationCommonRoutes';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { applicationIntlMessages } from './i18n/applicationMessages';
import IntroPage from './pages/intro-page/IntroPage';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import { getEnvVariableOrDefault } from './utils/envUtils';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';

export const APPLICATION_KEY = 'opplaringspenger';
export const SKJEMANAVN = 'Opplæringspenger';

function prepare() {
    if (getEnvironmentVariable('APP_VERSION') !== 'production') {
        if (getEnvVariableOrDefault('MSW_MODE', 'test') === 'test' || 1 + 1 === 2) {
            return import('../../mocks/msw/browser').then(({ worker }) =>
                worker.start({ onUnhandledRequest: 'bypass' })
            );
        }
    }
    return Promise.resolve();
}

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const publicPath = getEnvironmentVariable('PUBLIC_PATH');

const App = () => (
    <SifAppWrapper>
        <ErrorBoundary>
            <AmplitudeProvider
                applicationKey={APPLICATION_KEY}
                isActive={getEnvironmentVariable('USE_AMPLITUDE') === 'true'}>
                <SoknadApplication
                    appName="Søknad om opplæringspenger"
                    intlMessages={applicationIntlMessages}
                    sentryKey={APPLICATION_KEY}
                    appStatus={{
                        applicationKey: APPLICATION_KEY,
                        sanityConfig: {
                            projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
                            dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
                        },
                    }}
                    publicPath={publicPath}>
                    <SoknadApplicationCommonRoutes
                        contentRoutes={[
                            <Route index key="intro" element={<IntroPage />} />,
                            <Route path={SøknadRoutes.INTRO} key="intro" element={<IntroPage />} />,
                            <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
                            <Route path={SøknadRoutes.IKKE_TILGANG} key="ikke-tilgang" element={<>Ikke tilgang</>} />,
                        ]}
                    />
                </SoknadApplication>
            </AmplitudeProvider>
        </ErrorBoundary>
    </SifAppWrapper>
);
prepare().then(() => {
    root.render(<App />);
});
