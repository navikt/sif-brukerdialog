import { createRoot } from 'react-dom/client';
import { Navigate, Route } from 'react-router-dom';
import { OpplæringspengerApp } from '@navikt/sif-app-register';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import {
    ensureBaseNameForReactRouter,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { applicationIntlMessages } from './i18n';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import './app.css';
import søknadStateEndpoint from './api/endpoints/søknadStateEndpoint';
import { relocateToWelcomePage } from './utils/navigationUtils';

const container = document.getElementById('app');
const root = createRoot(container!);
const publicPath = getEnvironmentVariable('PUBLIC_PATH');

ensureBaseNameForReactRouter(publicPath);

const App = () => {
    const handleResetSoknad = async () => {
        await søknadStateEndpoint.purge();
        relocateToWelcomePage();
    };

    return (
        <SoknadApplication
            appKey={OpplæringspengerApp.key}
            appName={OpplæringspengerApp.navn}
            appTitle={OpplæringspengerApp.tittel.nb}
            onResetSoknad={handleResetSoknad}
            intlMessages={applicationIntlMessages}
            appStatus={{
                sanityConfig: {
                    projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
                    dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
                },
            }}
            publicPath={publicPath}>
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
};

root.render(<App />);
