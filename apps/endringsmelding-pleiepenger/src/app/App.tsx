import '@navikt/ds-css/darkside';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';

import { Theme } from '@navikt/ds-react';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { ensureBaseNameForReactRouter, SoknadApplication } from '@navikt/sif-common-soknad-ds';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Navigate, Route, Routes } from 'react-router-dom';

import DevPage from './dev/DevPage';
import { applicationIntlMessages } from './i18n';
import { SøknadRoutes } from './søknad/config/SøknadRoutes';
import Søknad from './søknad/Søknad';
import { appEnv } from './utils/appEnv';

dayjs.extend(isoWeek);

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    APP_VERSION,
    SIF_PUBLIC_ANALYTICS_API_KEY,
} = appEnv;

const isE2E = getMaybeEnv('E2E_TEST') === 'true';

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => (
    <Theme>
        <SoknadApplication
            appVersion={APP_VERSION}
            appKey={EndringsmeldingPsbApp.key}
            appName={EndringsmeldingPsbApp.navn}
            appTitle={EndringsmeldingPsbApp.tittel.nb}
            intlMessages={applicationIntlMessages}
            useAnalytics={!isE2E}
            analyticsApiKey={SIF_PUBLIC_ANALYTICS_API_KEY}
            appStatus={{
                sanityConfig: {
                    projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}
            publicPath={PUBLIC_PATH}>
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
    </Theme>
);

export default App;
