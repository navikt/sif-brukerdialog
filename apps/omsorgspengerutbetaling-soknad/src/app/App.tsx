import './app.css';

import { Theme } from '@navikt/ds-react';
import { OmsorgspengerutbetalingSNFriApp } from '@navikt/sif-app-register';
import { getMaybeEnv, isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import MockDate from 'mockdate';
import { Navigate, Route } from 'react-router-dom';

import { applicationIntlMessages } from './i18n';
import IkkeTilgangPage from './pages/ikke-tilgang-page/IkkeTilgangPage';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import { appEnv } from './utils/appEnv';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET: SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    APP_VERSION,
    SIF_PUBLIC_USE_ANALYTICS,
    SIF_PUBLIC_ANALYTICS_API_KEY,
} = appEnv;

const envNow = getMaybeEnv('MOCK_DATE');
if (envNow && getMaybeEnv('USE_MOCK_DATE') === 'true') {
    // eslint-disable-next-line no-console
    console.log(`setting time to: ${envNow}`);
    MockDate.set(new Date(envNow));
}

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => (
    <Theme>
        <SoknadApplication
            appVersion={APP_VERSION}
            appKey={OmsorgspengerutbetalingSNFriApp.key}
            appName={OmsorgspengerutbetalingSNFriApp.navn}
            appTitle={OmsorgspengerutbetalingSNFriApp.tittel.nb}
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
                    <Route index key="redirect" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                    <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
                    <Route path={SøknadRoutes.IKKE_TILGANG} key="ikke-tilgang" element={<IkkeTilgangPage />} />,
                    <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                ]}
            />
        </SoknadApplication>
    </Theme>
);

export default App;
