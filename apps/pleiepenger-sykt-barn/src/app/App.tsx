import { Modal } from '@navikt/ds-react';
import { createRoot } from 'react-dom/client';
import { Navigate, Route } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude/lib';
import SifAppWrapper from '@navikt/sif-common-core-ds/lib/components/sif-app-wrapper/SifAppWrapper';
import { SoknadApplication, SoknadApplicationCommonRoutes } from '@navikt/sif-common-soknad-ds';
import RouteConfig from './config/routeConfig';
import { applicationIntlMessages } from './i18n';
import GeneralErrorPage from './pages/general-error-page/GeneralErrorPage';
import Søknad from './søknad/Søknad';
import appSentryLogger from './utils/appSentryLogger';
import { getEnvironmentVariable } from './utils/envUtils';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';

export const APPLICATION_KEY = 'pleiepengesoknad';
export const SKJEMANAVN = 'Søknad om pleiepenger';

Modal.setAppElement('#app');
const publicPath = getEnvironmentVariable('PUBLIC_PATH');

const ensureBaseNameForReactRouter = (routerBaseUrl: string) => {
    if (!window.location.pathname.includes(routerBaseUrl)) {
        window.history.replaceState('', '', routerBaseUrl + window.location.pathname);
    }
};

appSentryLogger.init();

const App = () => {
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');

    return (
        <SifAppWrapper>
            <AmplitudeProvider applicationKey={APPLICATION_KEY}>
                <SoknadApplication
                    appName={SKJEMANAVN}
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
                                key="index"
                                path="/"
                                element={<Navigate to={RouteConfig.SØKNAD_ROUTE_PREFIX} replace={true} />}
                            />,
                            <Route key="søknad" path={`${RouteConfig.SØKNAD_ROUTE_PREFIX}/*`} element={<Søknad />} />,
                            <Route
                                key="errorpage"
                                path={RouteConfig.ERROR_PAGE_ROUTE}
                                element={<GeneralErrorPage />}
                            />,
                        ]}
                    />
                </SoknadApplication>
            </AmplitudeProvider>
        </SifAppWrapper>
    );
};

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
ensureBaseNameForReactRouter(publicPath);

root.render(<App />);
