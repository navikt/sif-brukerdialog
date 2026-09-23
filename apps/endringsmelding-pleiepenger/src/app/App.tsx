import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';

import { Box, Theme } from '@navikt/ds-react';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { getMaybeEnv, isProd } from '@navikt/sif-common-env';
import { ensureBaseNameForReactRouter, SoknadApplication } from '@navikt/sif-common-soknad-ds';
import { SkyraHandler } from '@sif/surveys';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Navigate, Route, Routes } from 'react-router-dom';

import DemoInfo from './components/demo/DemoInfo';
import DevPage from './dev/DevPage';
import { applicationIntlMessages } from './i18n';
import { SøknadRoutes } from './søknad/config/SøknadRoutes';
import Søknad from './søknad/Søknad';
import { appEnv } from './utils/appEnv';
import { isGitHubPages } from './utils/isGitHubPages';

dayjs.extend(isoWeek);

const { PUBLIC_PATH, SIF_PUBLIC_APPSTATUS_DATASET, SIF_PUBLIC_APPSTATUS_PROJECT_ID, SIF_PUBLIC_USE_ANALYTICS } = appEnv;

const isE2E = getMaybeEnv('E2E_TEST') === 'true';
const erGitHubPages = isGitHubPages();
const useAnalytics = !isE2E && (SIF_PUBLIC_USE_ANALYTICS ? SIF_PUBLIC_USE_ANALYTICS === 'true' : isProd());

if (!erGitHubPages) {
    ensureBaseNameForReactRouter(PUBLIC_PATH);
}

const App = () => (
    <Theme>
        {erGitHubPages && (
            <Box marginBlock="space-0 space-48">
                <DemoInfo />
            </Box>
        )}
        <div className={erGitHubPages ? 'demoMode' : undefined}>
            <SoknadApplication
                appKey={EndringsmeldingPsbApp.key}
                appName={EndringsmeldingPsbApp.navn}
                appTitle={EndringsmeldingPsbApp.tittel.nb}
                intlMessages={applicationIntlMessages}
                useAnalytics={useAnalytics}
                useHashRouter={erGitHubPages}
                appStatus={{
                    sanityConfig: {
                        projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                        dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                    },
                }}
                publicPath={PUBLIC_PATH}>
                <SkyraHandler />
                <Routes>
                    <Route key="dev" path="/dev" element={<DevPage />} />,
                    <Route
                        key="root"
                        index={true}
                        path={SøknadRoutes.APP_ROOT}
                        element={<Navigate to={SøknadRoutes.VELKOMMEN} replace={true} />}
                    />
                    <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
                </Routes>
            </SoknadApplication>
        </div>
        {erGitHubPages && (
            <Box marginBlock="space-48 space-24">
                <DemoInfo />
            </Box>
        )}
    </Theme>
);

export default App;
