import { createRoot } from 'react-dom/client';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import SifAppWrapper from '@navikt/sif-common-core-ds/src/components/sif-app-wrapper/SifAppWrapper';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { ensureBaseNameForReactRouter, SoknadApplication } from '@navikt/sif-common-soknad-ds';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import DevPage from './dev/DevPage';
import { applicationIntlMessages } from './i18n';
import ErrorBoundary from './modules/errorBoundary/ErrorBoundary';
import { SøknadRoutes } from './søknad/config/SøknadRoutes';
import Søknad from './søknad/Søknad';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';

dayjs.extend(isoWeek);

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const publicPath = getEnvironmentVariable('PUBLIC_PATH');
const isCypress = getEnvironmentVariable('CYPRESS_ENV') === 'true';

ensureBaseNameForReactRouter(publicPath);

function prepare() {
    if (getEnvironmentVariable('APP_VERSION') !== 'production') {
        if (getEnvironmentVariable('MSW') === 'on' && (window as any).Cypress === undefined) {
            return import('../mocks/msw/browser').then(({ worker }) => {
                worker.start({
                    onUnhandledRequest: 'bypass',
                    quiet: true,
                });
            });
        }
    }
    return Promise.resolve();
}

const App = () => (
    <SifAppWrapper>
        <ErrorBoundary>
            <AmplitudeProvider applicationKey={EndringsmeldingPsbApp.key} isActive={!isCypress}>
                <SoknadApplication
                    appName={EndringsmeldingPsbApp.navn}
                    intlMessages={applicationIntlMessages}
                    sentryKey={EndringsmeldingPsbApp.key}
                    appStatus={{
                        applicationKey: EndringsmeldingPsbApp.key,
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
