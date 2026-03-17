import '@navikt/ds-css';

import { FaroProvider } from '@navikt/sif-common-faro';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <FaroProvider applicationKey="omsorgspengesoknad-v2" appVersion="1.0.0" isActive={false}>
            <QueryClientProvider client={queryClient}>
                <IntlProvider locale="nb" messages={{}}>
                    <BrowserRouter basename="/omsorgspengesoknad-v2">
                        <div />
                        app
                    </BrowserRouter>
                </IntlProvider>
            </QueryClientProvider>
        </FaroProvider>
    );
};
