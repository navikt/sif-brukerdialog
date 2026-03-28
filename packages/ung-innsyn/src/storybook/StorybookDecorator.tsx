import '../ung-innsyn.css';

import { Theme } from '@navikt/ds-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { ungUi_messages_nb } from '../i18n/nb';
import { UngInnsynPage } from '../pages';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
    },
});

const allMessages: Record<string, string> = {
    ...ungUi_messages_nb,
};

export const StorybookDecorator = (Story: React.ComponentType) => {
    useEffect(() => {
        document.body.classList.add('innsynAppBody');
        return () => {
            document.body.classList.remove('innsynAppBody');
        };
    }, []);

    return (
        <Theme hasBackground={false}>
            <IntlProvider locale="nb" messages={allMessages}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter basename="/">
                        <UngInnsynPage documentTitle="Ung Innsyn">
                            <Story />
                        </UngInnsynPage>
                    </BrowserRouter>
                </QueryClientProvider>
            </IntlProvider>
        </Theme>
    );
};
