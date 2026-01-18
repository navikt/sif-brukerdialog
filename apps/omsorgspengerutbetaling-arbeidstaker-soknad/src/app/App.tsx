import './app.css';

import { Theme } from '@navikt/ds-react';
import { OmsorgspengerutbetalingArbeidstakerApp } from '@navikt/sif-app-register';
import { getMaybeEnv, isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    NoAccessPage,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MockDate from 'mockdate';
import { Navigate, Route } from 'react-router-dom';

import { mellomlagringService } from './api/mellomlagringService';
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
    SIF_PUBLIC_USE_ANALYTICS,
    SIF_PUBLIC_ANALYTICS_API_KEY,
    APP_VERSION,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const envNow = getMaybeEnv('MOCK_DATE');
if (envNow && getMaybeEnv('USE_MOCK_DATE') === 'true') {
    // eslint-disable-next-line no-console
    console.log(`setting time to: ${envNow}`);
    MockDate.set(new Date(envNow));
}

const handleResetSoknad = async () => {
    await mellomlagringService.purge();
    relocateToWelcomePage();
};

const queryClient = new QueryClient();

const App = () => (
    <Theme>
        <QueryClientProvider client={queryClient}>
            <SoknadApplication
                appVersion={APP_VERSION}
                appKey={OmsorgspengerutbetalingArbeidstakerApp.key}
                appName={OmsorgspengerutbetalingArbeidstakerApp.navn}
                appTitle={OmsorgspengerutbetalingArbeidstakerApp.tittel.nb}
                intlMessages={applicationIntlMessages}
                useLanguageSelector={appEnv.SIF_PUBLIC_FEATURE_NYNORSK === 'on'}
                onResetSoknad={handleResetSoknad}
                appStatus={{
                    sanityConfig: {
                        projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                        dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                    },
                }}
                publicPath={PUBLIC_PATH}
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
                                    papirskjemaUrl={getLenker().papirskjemaPrivat}
                                />
                            }
                        />,
                        <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                    ]}
                />
            </SoknadApplication>
        </QueryClientProvider>
    </Theme>
);

export default App;
