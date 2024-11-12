import { Navigate, Route } from 'react-router-dom';
import { EttersendelseApp } from '@navikt/sif-app-register';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { applicationIntlMessages } from './i18n';
import GeneralErrorPage from './pages/general-error-page/GeneralErrorPage';
import IntroPage from './pages/intro-page/IntroPage';
import SoknadRemoteDataFetcher from './soknad/SoknadRemoteDataFetcher';
import { appEnv } from './utils/appEnv';
import './app.css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import { isProd } from '@navikt/sif-common-env';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    SIF_PUBLIC_APPSTATUS_DATASET,
    APP_VERSION,
    SIF_PUBLIC_USE_AMPLITUDE,
    SIF_PUBLIC_AMPLITUDE_API_KEY,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => {
    return (
        <SoknadApplication
            appVersion={APP_VERSION}
            appKey={EttersendelseApp.key}
            appName={EttersendelseApp.navn}
            appTitle={EttersendelseApp.tittel.nb}
            intlMessages={applicationIntlMessages}
            appStatus={{
                sanityConfig: {
                    projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}
            publicPath={PUBLIC_PATH}
            useAmplitude={SIF_PUBLIC_USE_AMPLITUDE ? SIF_PUBLIC_USE_AMPLITUDE === 'true' : isProd()}
            amplitudeApiKey={SIF_PUBLIC_AMPLITUDE_API_KEY}>
            <SoknadApplicationCommonRoutes
                contentRoutes={[
                    <Route path={'/:soknadstype/melding/*'} key="soknad" element={<SoknadRemoteDataFetcher />} />,
                    <Route path={'/:soknadstype/'} key="søknadstype" element={<Navigate to={'melding'} />} />,
                    <Route path={'/:soknadstype/feil'} key="søknadstypeFeil" element={<GeneralErrorPage />} />,
                    <Route path={'/feil'} key="feil" element={<GeneralErrorPage />} />,
                    <Route path={'/'} key="intro" element={<IntroPage />} />,
                ]}
            />
        </SoknadApplication>
    );
};

export default App;
