import { Navigate, Route } from 'react-router-dom';
import { OmsorgsdagerKroniskApp } from '@navikt/sif-app-register';
import { isProd } from '@navikt/sif-common-env';
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

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    SIF_PUBLIC_USE_AMPLITUDE,
    APP_VERSION,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => (
    <SoknadApplication
        appVersion={APP_VERSION}
        appKey={OmsorgsdagerKroniskApp.key}
        appName={OmsorgsdagerKroniskApp.navn}
        appTitle={OmsorgsdagerKroniskApp.tittel.nb}
        intlMessages={applicationIntlMessages}
        useLanguageSelector={appEnv.SIF_PUBLIC_FEATURE_NYNORSK === 'on'}
        appStatus={{
            sanityConfig: {
                projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                dataset: SIF_PUBLIC_APPSTATUS_DATASET,
            },
        }}
        publicPath={PUBLIC_PATH}
        useAmplitude={SIF_PUBLIC_USE_AMPLITUDE ? SIF_PUBLIC_USE_AMPLITUDE === 'true' : isProd()}>
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
