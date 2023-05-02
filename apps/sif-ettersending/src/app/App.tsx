import { createRoot } from 'react-dom/client';
import { Navigate, Route } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import SifAppWrapper from '@navikt/sif-common-core-ds/lib/components/sif-app-wrapper/SifAppWrapper';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
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
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';
import './app.css';

export const APPLICATION_KEY = 'ettersending';
const appName = 'Ettersending av dokumenter innenfor sykdom i familien';

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const publicPath = getEnvironmentVariable('PUBLIC_PATH');

/** Redirecter fra / til publicPath */
ensureBaseNameForReactRouter(publicPath);

root.render(
    <SifAppWrapper>
        <AmplitudeProvider
            applicationKey={APPLICATION_KEY}
            isActive={getEnvironmentVariable('USE_AMPLITUDE') === 'true'}>
            <SoknadApplication
                appName={appName}
                intlMessages={applicationIntlMessages}
                sentryKey={APPLICATION_KEY}
                appStatus={{
                    applicationKey: APPLICATION_KEY,
                    sanityConfig: {
                        projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
                        dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
                    },
                }}
                publicPath={publicPath}>
                <SoknadApplicationCommonRoutes
                    contentRoutes={[
                        <Route path={'/:ytelse/melding/*'} key="soknad" element={<SoknadRemoteDataFetcher />} />,
                        <Route path={'/:ytelse/'} key="ytelse" element={<Navigate to={'melding'} />} />,
                        <Route path={'/:ytelse/feil'} key="ytelseFeil" element={<GeneralErrorPage />} />,
                        <Route path={'/feil'} key="feil" element={<GeneralErrorPage />} />,
                        <Route path={'/'} key="intro" element={<IntroPage />} />,
                    ]}
                />
            </SoknadApplication>
        </AmplitudeProvider>
    </SifAppWrapper>
);
