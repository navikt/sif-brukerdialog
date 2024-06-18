import { createRoot } from 'react-dom/client';
import { Navigate, Route } from 'react-router-dom';
import { EttersendelseApp } from '@navikt/sif-app-register';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import {
    ensureBaseNameForReactRouter,
    SoknadApplicationCommonRoutes,
    SoknadApplication,
} from '@navikt/sif-common-soknad-ds';
import { applicationIntlMessages } from './i18n';
import GeneralErrorPage from './pages/general-error-page/GeneralErrorPage';
import IntroPage from './pages/intro-page/IntroPage';
import SoknadRemoteDataFetcher from './soknad/SoknadRemoteDataFetcher';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import './app.css';

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const publicPath = getEnvironmentVariable('PUBLIC_PATH');

ensureBaseNameForReactRouter(publicPath);

const App = () => {
    return (
        <SoknadApplication
            appKey={EttersendelseApp.key}
            appName={EttersendelseApp.navn}
            intlMessages={applicationIntlMessages}
            appStatus={{
                sanityConfig: {
                    projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
                    dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
                },
            }}
            publicPath={publicPath}>
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

root.render(<App />);
