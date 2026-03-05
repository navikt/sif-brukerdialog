import '@navikt/ds-css';

import { AppInfoLoader } from '@app/components/AppInfoLoader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { applicationIntlMessages } from './app/i18n';
import { ErrorBoundary } from './common/components/ErrorBoundary';
import { initApiClients } from './utils/initApiClients';

initApiClients();

const queryClient = new QueryClient();

export const App = () => {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <IntlProvider locale="nb" messages={applicationIntlMessages.nb}>
                    <BrowserRouter basename="/sif-demo">
                        <AppInfoLoader />
                    </BrowserRouter>
                </IntlProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};
