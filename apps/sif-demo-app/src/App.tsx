import '@navikt/ds-css';

import { AppInfoLoader } from '@app/components/AppInfoLoader';
import { FaroProvider } from '@navikt/sif-common-faro';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { applicationIntlMessages } from './app/i18n';
import { initApiClients } from './utils/initApiClients';

initApiClients();

import { SøknadTilgjengeligGuard } from './app/components/søknad-app-status-guard/SøknadTilgjengeligGuard';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <FaroProvider applicationKey="sif-demo-app" appVersion="1.0.0" isActive={false}>
            <SøknadTilgjengeligGuard
                active={false}
                contentRenderer={() => (
                    <QueryClientProvider client={queryClient}>
                        <IntlProvider locale="nb" messages={applicationIntlMessages.nb}>
                            <BrowserRouter basename="/sif-demo">
                                <AppInfoLoader />
                            </BrowserRouter>
                        </IntlProvider>
                    </QueryClientProvider>
                )}
            />
        </FaroProvider>
    );
};
