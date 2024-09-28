import { Navigate, Route } from 'react-router-dom';
import { OmsorgspengerutbetalingSNFriApp } from '@navikt/sif-app-register';
import { getEnvironmentVariable, getMaybeEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
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

const publicPath = getEnvironmentVariable('PUBLIC_PATH');

const envNow = getMaybeEnvironmentVariable('MOCK_DATE');
if (envNow && getEnvironmentVariable('USE_MOCK_DATE') === 'true') {
    // eslint-disable-next-line no-console
    console.log(`setting time to: ${envNow}`);
    MockDate.set(new Date(envNow));
}

ensureBaseNameForReactRouter(publicPath);

const App = () => (
    <SoknadApplication
        appKey={OmsorgspengerutbetalingSNFriApp.key}
        appName={OmsorgspengerutbetalingSNFriApp.navn}
        appTitle={OmsorgspengerutbetalingSNFriApp.tittel.nb}
        intlMessages={applicationIntlMessages}
        appStatus={{
            sanityConfig: {
                projectId: getEnvironmentVariable('SIF_PUBLIC_APPSTATUS_PROJECT_ID'),
                dataset: getEnvironmentVariable('SIF_PUBLIC_APPSTATUS_DATASET'),
            },
        }}
        publicPath={publicPath}>
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
