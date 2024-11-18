import { SanityConfig } from '@navikt/appstatus-react-ds';
import { Navigate, Route } from 'react-router-dom';
import { PleiepengerSyktBarnApp } from '@navikt/sif-app-register';
import { getMaybeEnv, isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import MockDate from 'mockdate';
import { purge } from './api/api';
import RouteConfig from './config/routeConfig';
import { appEnv } from './env/appEnv';
import { applicationIntlMessages } from './i18n';
import GeneralErrorPage from './pages/general-error-page/GeneralErrorPage';
import Søknad from './søknad/Søknad';
import appSentryLogger from './utils/appSentryLogger';
import { relocateToSoknad } from './utils/navigationUtils';
import './app.css';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    APP_VERSION,
    SIF_PUBLIC_USE_AMPLITUDE,
    SIF_PUBLIC_AMPLITUDE_API_KEY,
} = appEnv;
ensureBaseNameForReactRouter(PUBLIC_PATH);

const envNow = getMaybeEnv('MOCK_DATE');
if (envNow && getMaybeEnv('USE_MOCK_DATE') === 'true') {
    // eslint-disable-next-line no-console
    console.log(`setting time to: ${envNow}`);
    MockDate.set(new Date(envNow));
}

appSentryLogger.init();

const App = () => {
    const sanityConfig: SanityConfig = {
        projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
        dataset: SIF_PUBLIC_APPSTATUS_DATASET,
    };

    const handleResetSoknad = async () => {
        await purge();
        relocateToSoknad();
    };

    return (
        <SoknadApplication
            appVersion={APP_VERSION}
            appKey={PleiepengerSyktBarnApp.key}
            appName={PleiepengerSyktBarnApp.navn}
            appTitle={PleiepengerSyktBarnApp.tittel.nb}
            appStatus={{ sanityConfig: sanityConfig }}
            intlMessages={applicationIntlMessages}
            useAmplitude={SIF_PUBLIC_USE_AMPLITUDE ? SIF_PUBLIC_USE_AMPLITUDE === 'true' : isProd()}
            publicPath={PUBLIC_PATH}
            amplitudeApiKey={SIF_PUBLIC_AMPLITUDE_API_KEY}
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
