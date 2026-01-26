import '@navikt/ds-css';
import './app.css';

import { Theme } from '@navikt/ds-react';
import { OmsorgsdagerAnnenForelderIkkeTilsynApp } from '@navikt/sif-app-register';
import { isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    NoAccessPage,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { Navigate, Route } from 'react-router-dom';

import { applicationIntlMessages, type AppMessageKeys } from './i18n';
import { getLenker } from './lenker';
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
            appKey={OmsorgsdagerAnnenForelderIkkeTilsynApp.key}
            appName={OmsorgsdagerAnnenForelderIkkeTilsynApp.navn}
            appTitle={OmsorgsdagerAnnenForelderIkkeTilsynApp.tittel.nb}
            intlMessages={applicationIntlMessages}
            publicPath={PUBLIC_PATH}
            useLanguageSelector={appEnv.SIF_PUBLIC_FEATURE_NYNORSK === 'on'}
            useAnalytics={SIF_PUBLIC_USE_ANALYTICS ? SIF_PUBLIC_USE_ANALYTICS === 'true' : isProd()}
            analyticsApiKey={SIF_PUBLIC_ANALYTICS_API_KEY}
            appStatus={{
                sanityConfig: {
                    projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}>
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
                                papirskjemaUrl={getLenker().papirskjema}
                            />
                        }
                    />,
                    <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                ]}
            />
        </SoknadApplication>
    </Theme>
);

export default App;
