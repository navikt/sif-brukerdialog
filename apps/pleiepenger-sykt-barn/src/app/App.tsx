import { SanityConfig } from '@navikt/appstatus-react-ds';
import { Modal } from '@navikt/ds-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude/lib';
import AppStatusWrapper from '@navikt/sif-common-core-ds/lib/components/app-status-wrapper/AppStatusWrapper';
import SifAppWrapper from '@navikt/sif-common-core-ds/lib/components/sif-app-wrapper/SifAppWrapper';
import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import dayjs from 'dayjs';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import RouteConfig from './config/routeConfig';
import GeneralErrorPage from './pages/general-error-page/GeneralErrorPage';
import UnavailablePage from './pages/unavailable-page/UnavailablePage';
import Søknad from './søknad/Søknad';
import appSentryLogger from './utils/appSentryLogger';
import { getEnvironmentVariable } from './utils/envUtils';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from './utils/localeUtils';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';
// import './app.less';

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

const localeFromSessionStorage = getLocaleFromSessionStorage();
dayjs.locale(localeFromSessionStorage);

const getAppStatusSanityConfig = (): SanityConfig | undefined => {
    const projectId = getEnvironmentVariable('APPSTATUS_PROJECT_ID');
    const dataset = getEnvironmentVariable('APPSTATUS_DATASET');
    return !projectId || !dataset ? undefined : { projectId, dataset };
};

const App = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);

    const appStatusSanityConfig = getAppStatusSanityConfig();
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');

    const content = (
        <Routes>
            <Route path="/" element={<Navigate to={RouteConfig.SØKNAD_ROUTE_PREFIX} replace={true} />} />
            <Route path={`${RouteConfig.SØKNAD_ROUTE_PREFIX}/*`} element={<Søknad />} />
            <Route path={RouteConfig.ERROR_PAGE_ROUTE} element={<GeneralErrorPage />} />
        </Routes>
    );

    return (
        <SifAppWrapper>
            <AmplitudeProvider applicationKey={APPLICATION_KEY}>
                <ApplicationWrapper
                    locale={locale}
                    publicPath={publicPath}
                    onChangeLocale={(activeLocale: Locale) => {
                        setLocaleInSessionStorage(activeLocale);
                        setLocale(activeLocale);
                    }}>
                    {appStatusSanityConfig ? (
                        <AppStatusWrapper
                            applicationKey={APPLICATION_KEY}
                            unavailableContentRenderer={() => <UnavailablePage />}
                            sanityConfig={appStatusSanityConfig}
                            contentRenderer={() => content}
                        />
                    ) : (
                        content
                    )}
                </ApplicationWrapper>
            </AmplitudeProvider>
        </SifAppWrapper>
    );
};

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
ensureBaseNameForReactRouter(publicPath);

root.render(<App />);
