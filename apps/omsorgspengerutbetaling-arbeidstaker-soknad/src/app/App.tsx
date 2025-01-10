import { Navigate, Route } from 'react-router-dom';
import { OmsorgspengerutbetalingArbeidstakerApp } from '@navikt/sif-app-register';
import { getMaybeEnv, isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import MockDate from 'mockdate';
import { mellomlagringService } from './api/mellomlagringService';
import { applicationIntlMessages } from './i18n';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import { appEnv } from './utils/appEnv';
import { relocateToWelcomePage } from './utils/navigationUtils';
import './app.css';

const {
    PUBLIC_PATH,
    SIF_PUBLIC_APPSTATUS_DATASET,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID,
    SIF_PUBLIC_USE_AMPLITUDE,
    SIF_PUBLIC_AMPLITUDE_API_KEY,
    APP_VERSION,
} = appEnv;

ensureBaseNameForReactRouter(PUBLIC_PATH);

const envNow = getMaybeEnv('MOCK_DATE');
if (envNow && getMaybeEnv('USE_MOCK_DATE') === 'true') {
    // eslint-disable-next-line no-console
    console.log(`setting time to: ${envNow}`);
    MockDate.set(new Date(envNow));
}

const handleResetSoknad = async () => {
    await mellomlagringService.purge();
    relocateToWelcomePage();
};

console.log(appEnv);
const App = () => (
    <SoknadApplication
        appVersion={APP_VERSION}
        appKey={OmsorgspengerutbetalingArbeidstakerApp.key}
        appName={OmsorgspengerutbetalingArbeidstakerApp.navn}
        appTitle={OmsorgspengerutbetalingArbeidstakerApp.tittel.nb}
        intlMessages={applicationIntlMessages}
        useLanguageSelector={appEnv.SIF_PUBLIC_FEATURE_NYNORSK === 'on'}
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
