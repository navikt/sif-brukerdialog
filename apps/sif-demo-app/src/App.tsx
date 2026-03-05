import '@navikt/ds-css';

import { AppInfoLoader } from '@app/components/AppInfoLoader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { applicationIntlMessages } from './app/i18n';
import { initApiClients } from './utils/initApiClients';

initApiClients();

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename="/sif-demo">
                <IntlProvider locale="nb" messages={applicationIntlMessages.nb}>
                    <AppInfoLoader />
                </IntlProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};
