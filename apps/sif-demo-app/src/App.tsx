import '@navikt/ds-css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { AppInfoLoader } from '@app/components/AppInfoLoader';

import { initApiClients } from './utils/initApiClients';

initApiClients();

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename="/sif-demo">
                <AppInfoLoader />
            </BrowserRouter>
        </QueryClientProvider>
    );
};
