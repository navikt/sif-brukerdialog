import { Navigate, Route } from 'react-router-dom';
import { isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds/src';
import { applicationIntlMessages } from './i18n';
import Søknad from './søknad/Søknad';
import { appEnv } from './types/appEnv';
import { SøknadRoutes } from './types/SøknadRoutes';
import '@navikt/ds-css';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    SIF_PUBLIC_APPSTATUS_DATASET,
    APP_VERSION,
    SIF_PUBLIC_USE_AMPLITUDE,
    SIF_PUBLIC_AMPLITUDE_API_KEY,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const App = () => {
    return (
        <SoknadApplication
            appVersion={APP_VERSION}
            appKey="ungdomsytelse"
            appName="Ungdomsytelse"
            appTitle="Ungdomsytelse MVP"
            publicPath={PUBLIC_PATH}
            intlMessages={applicationIntlMessages}
            appStatus={{
                sanityConfig: {
                    projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}
            useAmplitude={SIF_PUBLIC_USE_AMPLITUDE ? SIF_PUBLIC_USE_AMPLITUDE === 'true' : isProd()}
            amplitudeApiKey={SIF_PUBLIC_AMPLITUDE_API_KEY}>
            <SoknadApplicationCommonRoutes
                contentRoutes={[
                    <Route index key="redirect" element={<Navigate to={SøknadRoutes.SOKNAD_ROOT} />} />,
                    <Route path={SøknadRoutes.SOKNAD_ROOT} key="soknad" element={<Søknad />} />,
                ]}
            />
        </SoknadApplication>
    );
};

export default App;
