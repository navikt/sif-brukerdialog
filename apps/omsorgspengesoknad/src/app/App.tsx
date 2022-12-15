import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate, Route } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import SifAppWrapper from '@navikt/sif-common-core-ds/lib/components/sif-app-wrapper/SifAppWrapper';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import SoknadApplication from '@navikt/sif-common-soknad-ds/lib/soknad-application-setup/SoknadApplication';
import SoknadApplicationCommonRoutes from '@navikt/sif-common-soknad-ds/lib/soknad-application-setup/SoknadApplicationCommonRoutes';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { applicationIntlMessages } from './i18n';
import Søknad from './søknad/Søknad';
import { SøknadRoutes } from './types/SøknadRoutes';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';
import './app.css';

export const APPLICATION_KEY = 'omsorgspengersoknad';
export const SKJEMANAVN = 'omsorgspengesoknad';

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const publicPath = getEnvironmentVariable('PUBLIC_PATH');

/** Trigger */

const App = () => (
    <SifAppWrapper>
        <ErrorBoundary>
            <AmplitudeProvider
                applicationKey={APPLICATION_KEY}
                isActive={getEnvironmentVariable('USE_AMPLITUDE') === 'true'}>
                <SoknadApplication
                    appName="Søknad om omsorgspengesoknad"
                    intlMessages={applicationIntlMessages}
                    sentryKey={APPLICATION_KEY}
                    appStatus={{
                        applicationKey: APPLICATION_KEY,
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
            </AmplitudeProvider>
        </ErrorBoundary>
    </SifAppWrapper>
);

root.render(<App />);
