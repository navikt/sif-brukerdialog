import '../ung-innsyn.css';

import { Bleed, Box, Heading, Theme, VStack } from '@navikt/ds-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { fn } from 'storybook/test';

import { ungUi_messages_nb } from '../i18n/nb';
import { OppgavePageContext } from '../pages/hooks/useOppgavePage';

export const StateLabel = ({ children }: { children: React.ReactNode }) => (
    <Heading
        level="3"
        size="xsmall"
        style={{ color: 'var(--a-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {children}
    </Heading>
);

export const StoryBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <Bleed marginInline="space-32">
        <VStack gap="space-8" paddingBlock={'space-12 space-0'}>
            <StateLabel>{title}</StateLabel>
            <Box
                paddingInline={'space-32'}
                borderColor="neutral-strong"
                borderWidth="2 0 0 0"
                style={{ borderStyle: 'dashed' }}
                paddingBlock="space-32">
                {children}
            </Box>
        </VStack>
    </Bleed>
);

const panelPreviewQueryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

export const PanelPreviewWrapper = ({ children }: { children: React.ReactNode }) => (
    <Theme hasBackground={false}>
        <IntlProvider locale="nb" messages={ungUi_messages_nb}>
            <QueryClientProvider client={panelPreviewQueryClient}>
                <BrowserRouter basename="/">
                    <OppgavePageContext.Provider value={{ onCancel: fn(), onSuccess: fn() }}>
                        <Box
                            padding="space-48"
                            maxWidth={'48rem'}
                            style={{
                                background: 'var(--ax-bg-info-soft)',
                                border: '1px solid var(--a-border-subtle)',
                                borderRadius: '8px',
                            }}>
                            {children}
                        </Box>
                    </OppgavePageContext.Provider>
                </BrowserRouter>
            </QueryClientProvider>
        </IntlProvider>
    </Theme>
);
