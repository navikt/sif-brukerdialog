import './app.css';

import { Theme } from '@navikt/ds-react';
import { OmsorgsdagerAleneomsorgApp } from '@navikt/sif-app-register';
import { isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    NoAccessPage,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { Navigate, Route } from 'react-router-dom';

import { applicationIntlMessages, AppMessageKeys } from './i18n';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import { appEnv } from './utils/appEnv';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    APP_VERSION,
    SIF_PUBLIC_USE_ANALYTICS,
    SIF_PUBLIC_ANALYTICS_API_KEY,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => (
    <Theme>
        <SoknadApplication
            appVersion={APP_VERSION}
            appKey={OmsorgsdagerAleneomsorgApp.key}
            appName={OmsorgsdagerAleneomsorgApp.navn}
            appTitle={OmsorgsdagerAleneomsorgApp.tittel.nb}
            intlMessages={applicationIntlMessages}
            useLanguageSelector={appEnv.SIF_PUBLIC_FEATURE_NYNORSK === 'on'}
            appStatus={{
                sanityConfig: {
                    projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}
            useAnalytics={SIF_PUBLIC_USE_ANALYTICS ? SIF_PUBLIC_USE_ANALYTICS === 'true' : isProd()}
            analyticsApiKey={SIF_PUBLIC_ANALYTICS_API_KEY}
            publicPath={PUBLIC_PATH}>
            <SoknadApplicationCommonRoutes
                contentRoutes={[
                    <Route index key="redirect" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                    <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
                    <Route
                        path={SøknadRoutes.IKKE_TILGANG}
                        key="ikke-tilgang"
                        element={<NoAccessPage<AppMessageKeys> tittelIntlKey="application.title" />}
                    />,
                    <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                ]}
            />
        </SoknadApplication>
    </Theme>
);

export default App;
