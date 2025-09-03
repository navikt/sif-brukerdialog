import { Navigate, Route } from 'react-router-dom';
import { OmsorgsdagerAnnenForelderIkkeTilsynApp } from '@navikt/sif-app-register';
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
import './app.css';
import { Theme } from '@navikt/ds-react';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    APP_VERSION,
    SIF_PUBLIC_USE_AMPLITUDE,
    SIF_PUBLIC_AMPLITUDE_API_KEY,
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
            useAmplitude={SIF_PUBLIC_USE_AMPLITUDE ? SIF_PUBLIC_USE_AMPLITUDE === 'true' : isProd()}
            amplitudeApiKey={SIF_PUBLIC_AMPLITUDE_API_KEY}
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
    </Theme>
);

export default App;
