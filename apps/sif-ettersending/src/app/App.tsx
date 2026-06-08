import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import './app.css';

import { Theme } from '@navikt/ds-react';
import { EttersendelseApp } from '@navikt/sif-app-register';
import { isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { Navigate, Route } from 'react-router-dom';

import { applicationIntlMessages } from './i18n';
import GeneralErrorPage from './pages/general-error-page/GeneralErrorPage';
import IntroPage from './pages/intro-page/IntroPage';
import SoknadRemoteDataFetcher from './soknad/SoknadRemoteDataFetcher';
import { appEnv } from './utils/appEnv';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    SIF_PUBLIC_APPSTATUS_DATASET,
    APP_VERSION,
    SIF_PUBLIC_USE_ANALYTICS,
    SIF_PUBLIC_ANALYTICS_API_KEY,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => {
    return (
        <Theme>
            <SoknadApplication
                appVersion={APP_VERSION}
                appKey={EttersendelseApp.key}
                appName={EttersendelseApp.navn}
                appTitle={EttersendelseApp.tittel.nb}
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
                <SoknadApplicationCommonRoutes
                    contentRoutes={[
                        <Route path={'/:soknadstype/melding/*'} key="soknad" element={<SoknadRemoteDataFetcher />} />,
                        <Route path="/:soknadstype/" key="søknadstype" element={<Navigate to="melding" />} />,
                        <Route path="/:soknadstype/feil" key="søknadstypeFeil" element={<GeneralErrorPage />} />,
                        <Route path="/feil" key="feil" element={<GeneralErrorPage />} />,
                        <Route path="/" key="intro" element={<IntroPage />} />,
                    ]}
                />
            </SoknadApplication>
        </Theme>
    );
};

export default App;
