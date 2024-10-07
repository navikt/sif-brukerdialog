import { createRoot } from 'react-dom/client';
import { Navigate, Route, Routes } from 'react-router-dom';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { getEnvironmentVariable, getMaybeEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { ensureBaseNameForReactRouter, SoknadApplication } from '@navikt/sif-common-soknad-ds';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import MockDate from 'mockdate';
import DevPage from './dev/DevPage';
import { applicationIntlMessages } from './i18n';
import { SøknadRoutes } from './søknad/config/SøknadRoutes';
import Søknad from './søknad/Søknad';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';

dayjs.extend(isoWeek);

const container = document.getElementById('root');
// eslint-disable-next-line
const root = createRoot(container!);
const publicPath = getEnvironmentVariable('PUBLIC_PATH');
const isE2E = getEnvironmentVariable('E2E_TEST') === 'true';

ensureBaseNameForReactRouter(publicPath);

function prepare() {
    if (getEnvironmentVariable('APP_VERSION') !== 'production') {
        const envNow = getMaybeEnvironmentVariable('NOW');
        if (envNow && getEnvironmentVariable('APP_VERSION') === 'dev') {
            MockDate.set(new Date(envNow));
        }
        if (getEnvironmentVariable('MSW') === 'on' && isE2E !== undefined) {
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
        appKey={EndringsmeldingPsbApp.key}
        appName={EndringsmeldingPsbApp.navn}
        appTitle={EndringsmeldingPsbApp.tittel.nb}
        intlMessages={applicationIntlMessages}
        useAmplitude={!isE2E}
        appStatus={{
            sanityConfig: {
                projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
                dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
            },
        }}
        publicPath={publicPath}>
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
