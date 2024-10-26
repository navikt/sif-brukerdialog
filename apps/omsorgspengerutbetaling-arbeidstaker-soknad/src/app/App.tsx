import { Navigate, Route } from 'react-router-dom';
import { OmsorgspengerutbetalingArbeidstakerApp } from '@navikt/sif-app-register';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { mellomlagringService } from './api/mellomlagringService';
import { applicationIntlMessages } from './i18n';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import { relocateToWelcomePage } from './utils/navigationUtils';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import './app.css';
import { appEnv } from './utils/appEnv';
import { isProd } from '@navikt/sif-common-env';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    SIF_PUBLIC_USE_AMPLITUDE,
    SIF_PUBLIC_AMPLITUDE_API_KEY,
    APP_VERSION,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const handleResetSoknad = async () => {
    await mellomlagringService.purge();
    relocateToWelcomePage();
};

const App = () => (
    <SoknadApplication
        appVersion={APP_VERSION}
        appKey={OmsorgspengerutbetalingArbeidstakerApp.key}
        appName={OmsorgspengerutbetalingArbeidstakerApp.navn}
        appTitle={OmsorgspengerutbetalingArbeidstakerApp.tittel.nb}
        intlMessages={applicationIntlMessages}
        onResetSoknad={handleResetSoknad}
        appStatus={{
            sanityConfig: {
                projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                dataset: SIF_PUBLIC_APPSTATUS_DATASET,
            },
        }}
        publicPath={PUBLIC_PATH}
        useAmplitude={SIF_PUBLIC_USE_AMPLITUDE ? SIF_PUBLIC_USE_AMPLITUDE === 'true' : isProd()}
        amplitudeApiKey={SIF_PUBLIC_AMPLITUDE_API_KEY}>
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
