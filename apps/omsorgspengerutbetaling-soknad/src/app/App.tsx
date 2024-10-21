import { Navigate, Route } from 'react-router-dom';
import { OmsorgspengerutbetalingSNFriApp } from '@navikt/sif-app-register';
import { getEnv } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import MockDate from 'mockdate';
import { applicationIntlMessages } from './i18n';
import IkkeTilgangPage from './pages/ikke-tilgang-page/IkkeTilgangPage';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import './app.css';
import { appEnv } from './utils/appEnv';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET: SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
} = appEnv;

const envNow = getEnv('MOCK_DATE');
if (envNow && getEnv('USE_MOCK_DATE') === 'true') {
    // eslint-disable-next-line no-console
    console.log(`setting time to: ${envNow}`);
    MockDate.set(new Date(envNow));
}

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => (
    <SoknadApplication
        appKey={OmsorgspengerutbetalingSNFriApp.key}
        appName={OmsorgspengerutbetalingSNFriApp.navn}
        appTitle={OmsorgspengerutbetalingSNFriApp.tittel.nb}
        intlMessages={applicationIntlMessages}
        appStatus={{
            sanityConfig: {
                projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                dataset: SIF_PUBLIC_APPSTATUS_DATASET,
            },
        }}
        publicPath={PUBLIC_PATH}>
        <SoknadApplicationCommonRoutes
            contentRoutes={[
                <Route index key="redirect" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
                <Route path={SøknadRoutes.IKKE_TILGANG} key="ikke-tilgang" element={<IkkeTilgangPage />} />,
                <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
            ]}
        />
    </SoknadApplication>
);

export default App;
