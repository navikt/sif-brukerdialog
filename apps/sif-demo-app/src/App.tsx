import '@navikt/ds-css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppInfoLoader } from '@app/components/AppInfoLoader';
import { KvitteringPage } from '@app/pages/KvitteringPage';
import { VelkommenPage } from '@app/pages/VelkommenPage';
import { SøknadRouter } from '@app/SøknadRouter';

import { initApiClients } from './utils/initApiClients';

initApiClients();

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename="/sif-demo">
                <AppInfoLoader>
                    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                        <Routes>
                            <Route path="/" element={<VelkommenPage />} />
                            <Route path="/kvittering" element={<KvitteringPage />} />
                            <Route path="/soknad/*" element={<SøknadRouter />} />
                        </Routes>
                    </div>
                </AppInfoLoader>
            </BrowserRouter>
        </QueryClientProvider>
    );
};
