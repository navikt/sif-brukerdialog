import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate, Route } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import SifAppWrapper from '@navikt/sif-common-core-ds/lib/components/sif-app-wrapper/SifAppWrapper';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import SoknadApplication from '@navikt/sif-common-soknad-ds/lib/soknad-application-setup/SoknadApplication';
import SoknadApplicationCommonRoutes from '@navikt/sif-common-soknad-ds/lib/soknad-application-setup/SoknadApplicationCommonRoutes';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { applicationIntlMessages } from './i18n/applicationMessages';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './søknad/config/SøknadRoutes';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';
import { getEnvVariableOrDefault } from './utils/envUtils';

export const APPLICATION_KEY = 'opplaringspenger';
export const SKJEMANAVN = 'Opplæringspenger';

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const publicPath = getEnvironmentVariable('PUBLIC_PATH');

/** Trigger build */

function prepare() {
    if (getEnvironmentVariable('APP_VERSION') !== 'production') {
        if (getEnvVariableOrDefault('MSW_MODE', 'test') === 'test') {
            return import('../../mocks/msw/browser').then(({ worker }) =>
                worker.start({ onUnhandledRequest: 'bypass' })
            );
        }
    }
    return Promise.resolve();
}

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
                            <Route
                                key="root"
                                index={true}
                                path={SøknadRoutes.APP_ROOT}
                                element={<Navigate to={SøknadRoutes.INNLOGGET_ROOT} replace={true} />}
                            />,
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
