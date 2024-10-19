import { Navigate, Route } from 'react-router-dom';
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

ensureBaseNameForReactRouter(appEnv.PUBLIC_PATH);

const App = () => {
    return (
        <SoknadApplication
            appKey="ungdomsytelse"
            appName="Ungdomsytelse"
            appTitle="Ungdomsytelse MVP"
            publicPath={appEnv.PUBLIC_PATH}
            intlMessages={applicationIntlMessages}
            appStatus={{
                sanityConfig: {
                    projectId: appEnv.SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: appEnv.SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}>
            <SoknadApplicationCommonRoutes
                contentRoutes={[
                    <Route index key="redirect" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                    <Route path={SøknadRoutes.SOKNAD_ROOT} key="soknad" element={<Søknad />} />,
                    <Route path={SøknadRoutes.VELKOMMEN} key="soknad" element={<Søknad />} />,
                    <Route path={SøknadRoutes.IKKE_TILGANG} key="ikke-tilgang" element={<>Ikke tilgang</>} />,
                    <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                ]}
            />
        </SoknadApplication>
    );
};

export default App;
