import { Navigate, Route } from 'react-router-dom';
import { SoknadApplication, SoknadApplicationCommonRoutes } from '@navikt/sif-common-soknad-ds/src';
import Søknad from './søknad/Søknad';
import { browserEnv } from './types/browserEnv';
import { SøknadRoutes } from './types/SøknadRoutes';
import '@navikt/ds-css';
import { applicationIntlMessages } from './i18n';

const App = () => {
    return (
        <SoknadApplication
            appKey="ungdomsytelse"
            appName="Ungdomsytelse"
            appTitle="Ungdomsytelse MVP"
            publicPath={browserEnv.PUBLIC_PATH}
            intlMessages={applicationIntlMessages}
            appStatus={{
                sanityConfig: {
                    projectId: browserEnv.APPSTATUS_PROJECT_ID,
                    dataset: browserEnv.APPSTATUS_DATASET,
                },
            }}>
            <SoknadApplicationCommonRoutes
                contentRoutes={[
                    <Route index key="redirect" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                    <Route path={SøknadRoutes.SOKNAD_ROOT} key="soknad" element={<Søknad />} />,
                    <Route path={SøknadRoutes.IKKE_TILGANG} key="ikke-tilgang" element={<>Ikke tilgang</>} />,
                    <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                ]}
            />
        </SoknadApplication>
    );
};

export default App;
