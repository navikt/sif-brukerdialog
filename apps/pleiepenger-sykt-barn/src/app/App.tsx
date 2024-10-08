import { SanityConfig } from '@navikt/appstatus-react-ds';
import { Navigate, Route } from 'react-router-dom';
import { PleiepengerSyktBarnApp } from '@navikt/sif-app-register';
import { getEnvironmentVariable, getMaybeEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import MockDate from 'mockdate';
import { purge } from './api/api';
import RouteConfig from './config/routeConfig';
import { applicationIntlMessages } from './i18n';
import GeneralErrorPage from './pages/general-error-page/GeneralErrorPage';
import Søknad from './søknad/Søknad';
import appSentryLogger from './utils/appSentryLogger';
import { relocateToSoknad } from './utils/navigationUtils';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import './app.less';

const publicPath = getEnvironmentVariable('PUBLIC_PATH');
ensureBaseNameForReactRouter(publicPath);

const envNow = getMaybeEnvironmentVariable('MOCK_DATE');
if (envNow && getEnvironmentVariable('USE_MOCK_DATE') === 'true') {
    // eslint-disable-next-line no-console
    console.log(`setting time to: ${envNow}`);
    MockDate.set(new Date(envNow));
}

appSentryLogger.init();

const App = () => {
    const useAmplitude = getEnvironmentVariable('USE_AMPLITUDE') === 'true';

    const sanityConfig: SanityConfig = {
        projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
        dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
    };

    const handleResetSoknad = async () => {
        await purge();
        relocateToSoknad();
    };

    return (
        <SoknadApplication
            appKey={PleiepengerSyktBarnApp.key}
            appName={PleiepengerSyktBarnApp.navn}
            appTitle={PleiepengerSyktBarnApp.tittel.nb}
            appStatus={{ sanityConfig: sanityConfig }}
            intlMessages={applicationIntlMessages}
            useAmplitude={useAmplitude}
            publicPath={publicPath}
            onResetSoknad={handleResetSoknad}>
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
                    <Route key="errorpage" path={RouteConfig.ERROR_PAGE_ROUTE} element={<GeneralErrorPage />} />,
                ]}
            />
        </SoknadApplication>
    );
};

export default App;
