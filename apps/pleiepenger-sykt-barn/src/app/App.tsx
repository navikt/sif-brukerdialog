import { createRoot } from 'react-dom/client';
import { Navigate, Route } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude/lib';
import SifAppWrapper from '@navikt/sif-common-core-ds/lib/components/sif-app-wrapper/SifAppWrapper';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { PleiepengerSyktBarnApp } from '@navikt/sif-app-register';
import { SoknadApplication, SoknadApplicationCommonRoutes } from '@navikt/sif-common-soknad-ds';
import DevBranchInfo from '@navikt/sif-common-soknad-ds/lib/components/dev-branch-info/DevBranchInfo';
import RouteConfig from './config/routeConfig';
import { applicationIntlMessages } from './i18n';
import GeneralErrorPage from './pages/general-error-page/GeneralErrorPage';
import Søknad from './søknad/Søknad';
import appSentryLogger from './utils/appSentryLogger';
import { relocateToSoknad } from './utils/navigationUtils';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';
import './app.less';

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
            <AmplitudeProvider applicationKey={PleiepengerSyktBarnApp.key}>
                <SoknadApplication
                    appName={PleiepengerSyktBarnApp.navn}
                    intlMessages={applicationIntlMessages}
                    sentryKey={PleiepengerSyktBarnApp.key}
                    appStatus={{
                        applicationKey: PleiepengerSyktBarnApp.key,
                        sanityConfig: {
                            projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
                            dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
                        },
                    }}
                    publicPath={publicPath}>
                    <SoknadApplicationCommonRoutes
                        onReset={() => {
                            relocateToSoknad();
                        }}
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
                    <DevBranchInfo />
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
