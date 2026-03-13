import '@navikt/ds-css';

import { FaroProvider } from '@navikt/sif-common-faro';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { initApiClients } from './app/api/initApiClients';
import { applicationIntlMessages } from './app/i18n';
import { AppInitialDataLoader } from './AppInitialDataLoader';

initApiClients();

const queryClient = new QueryClient();

export const App = () => {
    return (
        <FaroProvider applicationKey="sif-demo-app" appVersion="1.0.0" isActive={false}>
            {/* <AppStatusChecker
                active={false}
                contentRenderer={() => ( */}
            <QueryClientProvider client={queryClient}>
                <IntlProvider locale="nb" messages={applicationIntlMessages.nb}>
                    <BrowserRouter basename="/sif-demo">
                        <AppInitialDataLoader />
                    </BrowserRouter>
                </IntlProvider>
            </QueryClientProvider>
            {/* )}
            /> */}
        </FaroProvider>
    );
};
