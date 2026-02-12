import './app.css';

import { Box, Theme } from '@navikt/ds-react';
import { OpplæringspengerApp } from '@navikt/sif-app-register';
import { isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    NoAccessPage,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route } from 'react-router-dom';

import { mellomlagringService } from './api/mellomlagringService';
import DemoInfo from './components/demo/DemoInfo';
import { applicationIntlMessages, type AppMessageKeys } from './i18n';
import getLenker from './lenker';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import { appEnv } from './utils/appEnv';
import { relocateToWelcomePage } from './utils/navigationUtils';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    APP_VERSION,
    SIF_PUBLIC_USE_ANALYTICS,
    SIF_PUBLIC_ANALYTICS_API_KEY,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);
const queryClient = new QueryClient();

const isGitHubPages = typeof __IS_GITHUB_PAGES__ !== 'undefined' && __IS_GITHUB_PAGES__;

const App = () => {
    return (
        <Theme>
            {__IS_GITHUB_PAGES__ && (
                <Box marginBlock="space-0 space-48">
                    <DemoInfo />
                </Box>
            )}
            <QueryClientProvider client={queryClient}>
                <div className="demoMode">
                    <SoknadApplication
                        appVersion={APP_VERSION}
                        appKey={OpplæringspengerApp.key}
                        appName={OpplæringspengerApp.navn}
                        appTitle={OpplæringspengerApp.tittel.nb}
                        intlMessages={applicationIntlMessages}
                        useLanguageSelector={appEnv.SIF_PUBLIC_FEATURE_NYNORSK === 'on'}
                        useHashRouter={isGitHubPages}
                        appStatus={{
                            sanityConfig: {
                                projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                                dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                            },
                        }}
                        publicPath={PUBLIC_PATH}
                        onResetSoknad={async () => {
                            await mellomlagringService.purge();
                            relocateToWelcomePage();
                        }}
                        useAnalytics={SIF_PUBLIC_USE_ANALYTICS ? SIF_PUBLIC_USE_ANALYTICS === 'true' : isProd()}
                        analyticsApiKey={SIF_PUBLIC_ANALYTICS_API_KEY}>
                        <SoknadApplicationCommonRoutes
                            contentRoutes={[
                                <Route index key="redirect" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                                <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
                                <Route
                                    path={SøknadRoutes.IKKE_TILGANG}
                                    key="ikke-tilgang"
                                    element={
                                        <NoAccessPage<AppMessageKeys>
                                            tittelIntlKey="application.title"
                                            papirskjemaUrl={getLenker().søknadPåPapir}
                                        />
                                    }
                                />,
                                <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                            ]}
                        />
                    </SoknadApplication>
                </div>
            </QueryClientProvider>
            {__IS_GITHUB_PAGES__ && (
                <Box marginBlock="space-48 space-24">
                    <DemoInfo />
                </Box>
            )}
        </Theme>
    );
};
export default App;
