import { createRoot } from 'react-dom/client';
import { Navigate, Route, Routes } from 'react-router-dom';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { getMaybeEnv, isDevMode } from '@navikt/sif-common-env';
import { ensureBaseNameForReactRouter, SoknadApplication } from '@navikt/sif-common-soknad-ds';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import MockDate from 'mockdate';
import DevPage from './dev/DevPage';
import { applicationIntlMessages } from './i18n';
import { SøknadRoutes } from './søknad/config/SøknadRoutes';
import Søknad from './søknad/Søknad';
import { appEnv } from './utils/appEnv';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';

dayjs.extend(isoWeek);

const { PUBLIC_PATH, SIF_PUBLIC_APPSTATUS_DATASET, SIF_PUBLIC_APPSTATUS_PROJECT_ID, APP_VERSION } = appEnv;
const container = document.getElementById('root');
// eslint-disable-next-line
const root = createRoot(container!);
const isE2E = getMaybeEnv('E2E_TEST') === 'true';

ensureBaseNameForReactRouter(PUBLIC_PATH);

function prepare() {
    if (isDevMode()) {
        const envNow = getMaybeEnv('NOW');
        if (envNow) {
            MockDate.set(new Date(envNow));
        }
        if (getMaybeEnv('MSW') === 'on' && isE2E !== undefined) {
            return import('../mocks/msw/browser').then(({ worker }) => {
                worker.start({
                    onUnhandledRequest: 'bypass',
                    quiet: false,
                });
            });
        }
    }
    return Promise.resolve();
}

const App = () => (
    <SoknadApplication
        appVersion={APP_VERSION}
        appKey={EndringsmeldingPsbApp.key}
        appName={EndringsmeldingPsbApp.navn}
        appTitle={EndringsmeldingPsbApp.tittel.nb}
        intlMessages={applicationIntlMessages}
        useAmplitude={!isE2E}
        appStatus={{
            sanityConfig: {
                projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                dataset: SIF_PUBLIC_APPSTATUS_DATASET,
            },
        }}
        publicPath={PUBLIC_PATH}>
        <Routes>
            <Route key="dev" path="/dev" element={<DevPage />} />,
            <Route
                key="root"
                index={true}
                path={SøknadRoutes.APP_ROOT}
                element={<Navigate to={SøknadRoutes.VELKOMMEN} replace={true} />}
            />
            <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
        </Routes>
    </SoknadApplication>
);

prepare().then(() => {
    root.render(<App />);
});
