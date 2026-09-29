import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import '../demo/demo.css';

import { Theme } from '@navikt/ds-react';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { getMaybeEnv, isProd } from '@navikt/sif-common-env';
import { ensureBaseNameForReactRouter, SoknadApplication } from '@navikt/sif-common-soknad-ds';
import { DemoInfoAlert } from '@sif/soknad-ui';
import { SkyraHandler } from '@sif/surveys';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ScenarioHeader } from '../demo/ScenarioHeader';
import DevPage from './dev/DevPage';
import { applicationIntlMessages } from './i18n';
import { SøknadRoutes } from './søknad/config/SøknadRoutes';
import Søknad from './søknad/Søknad';
import { appEnv } from './utils/appEnv';

dayjs.extend(isoWeek);

const { PUBLIC_PATH, SIF_PUBLIC_APPSTATUS_DATASET, SIF_PUBLIC_APPSTATUS_PROJECT_ID, SIF_PUBLIC_USE_ANALYTICS } =
    appEnv;

const isE2E = getMaybeEnv('E2E_TEST') === 'true';
const useAnalytics = !isE2E && (SIF_PUBLIC_USE_ANALYTICS ? SIF_PUBLIC_USE_ANALYTICS === 'true' : isProd());

if (!__IS_GITHUB_PAGES__) {
    ensureBaseNameForReactRouter(PUBLIC_PATH);
}

const App = () => (
    <Theme>
        {__IS_DEMO__ && (
            <>
                <ScenarioHeader />
                <DemoInfoAlert appTitle={EndringsmeldingPsbApp.tittel.nb} />
            </>
        )}
        <div className={__IS_DEMO__ ? 'demoMode' : undefined}>
            <SoknadApplication
                appKey={EndringsmeldingPsbApp.key}
                appName={EndringsmeldingPsbApp.navn}
                appTitle={EndringsmeldingPsbApp.tittel.nb}
                intlMessages={applicationIntlMessages}
                useAnalytics={useAnalytics}
                useHashRouter={__IS_GITHUB_PAGES__}
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
    </Theme>
);

export default App;
