import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import SifAppWrapper from '@navikt/sif-common-core-ds/lib/components/sif-app-wrapper/SifAppWrapper';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { ensureBaseNameForReactRouter } from '@navikt/sif-common-soknad-ds/lib';
import SoknadApplication from '@navikt/sif-common-soknad-ds/lib/soknad-application-setup/SoknadApplication';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import DevPage from './dev/DevPage';
import { applicationIntlMessages } from './i18n';
import { SøknadRoutes } from './søknad/config/SøknadRoutes';
import Søknad from './søknad/Søknad';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';

dayjs.extend(isoWeek);

export const APPLICATION_KEY = 'endringsmelding-pleiepenger';
export const SKJEMANAVN = 'Endringsmelding pleiepenger sykt barn';

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const publicPath = getEnvironmentVariable('PUBLIC_PATH');

ensureBaseNameForReactRouter(publicPath);

function prepare() {
    if (getEnvironmentVariable('APP_VERSION') !== 'production') {
        if (getEnvironmentVariable('MSW') === '-on') {
            return import('../../mocks/msw/browser').then(({ worker }) => {
                worker.start({
                    onUnhandledRequest: 'bypass',
                });
            });
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
                    appName="Endringsmelding - pleiepenger sykt barn"
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
                    <Routes>
                        <Route key="dev" path="/dev" element={<DevPage />} />,
                        <Route
                            key="root"
                            index={true}
                            path={SøknadRoutes.APP_ROOT}
                            element={<Navigate to={SøknadRoutes.VELKOMMEN} replace={true} />}
                        />
                        <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
                    </Routes>
                </SoknadApplication>
            </AmplitudeProvider>
        </ErrorBoundary>
    </SifAppWrapper>
);

prepare().then(() => {
    root.render(<App />);
});
