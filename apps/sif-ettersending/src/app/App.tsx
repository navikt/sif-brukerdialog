import { createRoot } from 'react-dom/client';
import { Navigate, Route } from 'react-router-dom';
import { EttersendelseApp } from '@navikt/sif-app-register';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import SifAppWrapper from '@navikt/sif-common-core-ds/src/components/sif-app-wrapper/SifAppWrapper';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { applicationIntlMessages } from './i18n/applicationMessages';
import GeneralErrorPage from './pages/general-error-page/GeneralErrorPage';
import IntroPage from './pages/intro-page/IntroPage';
import SoknadRemoteDataFetcher from './soknad/SoknadRemoteDataFetcher';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import './app.css';

const publicPath = getEnvironmentVariable('PUBLIC_PATH');
ensureBaseNameForReactRouter(publicPath);

const App = () => {
    return (
        <SifAppWrapper>
            <AmplitudeProvider
                applicationKey={EttersendelseApp.key}
                isActive={getEnvironmentVariable('USE_AMPLITUDE') === 'true'}>
                <SoknadApplication
                    appName={EttersendelseApp.navn}
                    intlMessages={applicationIntlMessages}
                    sentryKey={EttersendelseApp.key}
                    appStatus={{
                        applicationKey: EttersendelseApp.key,
                        sanityConfig: {
                            projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
                            dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
                        },
                    }}
                    publicPath={publicPath}>
                    <SoknadApplicationCommonRoutes
                        contentRoutes={[
                            <Route
                                path={'/:soknadstype/melding/*'}
                                key="soknad"
                                element={<SoknadRemoteDataFetcher />}
                            />,
                            <Route path={'/:soknadstype/'} key="søknadstype" element={<Navigate to={'melding'} />} />,
                            <Route path={'/:soknadstype/feil'} key="søknadstypeFeil" element={<GeneralErrorPage />} />,
                            <Route path={'/feil'} key="feil" element={<GeneralErrorPage />} />,
                            <Route path={'/'} key="intro" element={<IntroPage />} />,
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

root.render(<App />);
