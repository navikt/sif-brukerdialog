import { Navigate, Route } from 'react-router-dom';
import { OmsorgsdagerAnnenForelderIkkeTilsynApp } from '@navikt/sif-app-register';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { applicationIntlMessages } from './i18n';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import { appEnv } from './utils/appEnv';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import './app.css';

const { PUBLIC_PATH, SIF_PUBLIC_APPSTATUS_DATASET, SIF_PUBLIC_APPSTATUS_PROJECT_ID } = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => (
    <SoknadApplication
        appKey={OmsorgsdagerAnnenForelderIkkeTilsynApp.key}
        appName={OmsorgsdagerAnnenForelderIkkeTilsynApp.navn}
        appTitle={OmsorgsdagerAnnenForelderIkkeTilsynApp.tittel.nb}
        intlMessages={applicationIntlMessages}
        publicPath={PUBLIC_PATH}
        useLanguageSelector={false}
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
                <Route path={SøknadRoutes.IKKE_TILGANG} key="ikke-tilgang" element={<>Ikke tilgang</>} />,
                <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
            ]}
        />
    </SoknadApplication>
);

export default App;
