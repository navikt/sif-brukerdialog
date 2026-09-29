import './app.css';

import { Theme } from '@navikt/ds-react';
import { OpplæringspengerApp } from '@navikt/sif-app-register';
import { isProd } from '@navikt/sif-common-env';
import {
    ensureBaseNameForReactRouter,
    NoAccessPage,
    SoknadApplication,
    SoknadApplicationCommonRoutes,
} from '@navikt/sif-common-soknad-ds';
import { DemoInfoAlert, DemoWatermark } from '@sif/soknad-ui';
import { UxSignalsLoaderProvider } from '@sif/surveys';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route } from 'react-router-dom';

import { ScenarioHeader } from '../demo/ScenarioHeader';
import { mellomlagringService } from './api/mellomlagringService';
import { applicationIntlMessages, type AppMessageKeys } from './i18n';
import getLenker from './lenker';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import { appEnv } from './utils/appEnv';
import { relocateToWelcomePage } from './utils/navigationUtils';

const { PUBLIC_PATH, SIF_PUBLIC_APPSTATUS_DATASET, SIF_PUBLIC_APPSTATUS_PROJECT_ID, SIF_PUBLIC_USE_ANALYTICS } = appEnv;

if (!__IS_GITHUB_PAGES__) {
    ensureBaseNameForReactRouter(PUBLIC_PATH);
}
const queryClient = new QueryClient();

const App = () => {
    return (
        <Theme>
            {__IS_DEMO__ && (
                <>
                    <ScenarioHeader />
                    <DemoInfoAlert appTitle={OpplæringspengerApp.tittel.nb} />
                </>
            )}
            <QueryClientProvider client={queryClient}>
                <UxSignalsLoaderProvider>
                    <DemoWatermark enabled={__IS_DEMO__}>
                        <SoknadApplication
                            appKey={OpplæringspengerApp.key}
                            appName={OpplæringspengerApp.navn}
                            appTitle={OpplæringspengerApp.tittel.nb}
                            intlMessages={applicationIntlMessages}
                            useLanguageSelector={appEnv.SIF_PUBLIC_FEATURE_NYNORSK === 'on'}
                            useHashRouter={__IS_GITHUB_PAGES__}
                            appStatus={{
                                sanityConfig: {
                                    projectId: SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                                    dataset: SIF_PUBLIC_APPSTATUS_DATASET,
                                },
                            }}
                            publicPath={PUBLIC_PATH}
                            onResetSoknad={async () => {
                                await mellomlagringService.purge();
                                relocateToWelcomePage();
                            }}
                            useAnalytics={SIF_PUBLIC_USE_ANALYTICS ? SIF_PUBLIC_USE_ANALYTICS === 'true' : isProd()}>
                            <SoknadApplicationCommonRoutes
                                contentRoutes={[
                                    <Route index key="redirect" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                                    <Route path={SøknadRoutes.INNLOGGET_ROOT} key="soknad" element={<Søknad />} />,
                                    <Route
                                        path={SøknadRoutes.IKKE_TILGANG}
                                        key="ikke-tilgang"
                                        element={
                                            <NoAccessPage<AppMessageKeys>
                                                tittelIntlKey="application.title"
                                                papirskjemaUrl={getLenker().søknadPåPapir}
                                            />
                                        }
                                    />,
                                    <Route path="*" key="ukjent" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />,
                                ]}
                            />
                        </SoknadApplication>
                    </DemoWatermark>
                </UxSignalsLoaderProvider>
            </QueryClientProvider>
        </Theme>
    );
};
export default App;
