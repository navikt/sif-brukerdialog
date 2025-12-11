import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route } from 'react-router-dom';
import { OmsorgsdagerKroniskApp } from '@navikt/sif-app-register';
import { isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { initApiClients } from './api/initApiClients';
import { applicationIntlMessages } from './i18n';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import { appEnv } from './utils/appEnv';
import './app.css';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    SIF_PUBLIC_USE_ANALYTICS,
    SIF_PUBLIC_ANALYTICS_API_KEY,
    APP_VERSION,
} = appEnv;
const queryClient = new QueryClient();

ensureBaseNameForReactRouter(PUBLIC_PATH);
initApiClients();

const App = () => {
    return (
        <SoknadApplication
            appVersion={APP_VERSION}
            appKey={OmsorgsdagerKroniskApp.key}
            appName={OmsorgsdagerKroniskApp.navn}
            appTitle={OmsorgsdagerKroniskApp.tittel.nb}
            intlMessages={applicationIntlMessages}
            useLanguageSelector={appEnv.SIF_PUBLIC_FEATURE_NYNORSK === 'on'}
            appStatus={{
                sanityConfig: {
                    projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}
            publicPath={PUBLIC_PATH}
            useAnalytics={SIF_PUBLIC_USE_ANALYTICS ? SIF_PUBLIC_USE_ANALYTICS === 'true' : isProd()}
            analyticsApiKey={SIF_PUBLIC_ANALYTICS_API_KEY}>
            <QueryClientProvider client={queryClient}>
                <SoknadApplicationCommonRoutes
                    contentRoutes={[
                        <Route index key="redirect" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                        <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
                        <Route path={SøknadRoutes.IKKE_TILGANG} key="ikke-tilgang" element={<>Ikke tilgang</>} />,
                        <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                    ]}
                />
            </QueryClientProvider>
        </SoknadApplication>
    );
};

export default App;
