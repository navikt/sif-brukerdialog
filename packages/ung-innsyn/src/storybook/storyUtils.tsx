import '../ung-innsyn.css';

import { Box, Heading, Theme, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { Oppgave } from '@sif/api/ung-brukerdialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { fn } from 'storybook/test';

import { OppgaverList } from '../components';
import { ungInnsyn_messages_nb } from '../i18n/nb';
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
    // <Bleed marginInline="space-32">
    <VStack gap="space-8" paddingBlock={'space-12 space-0'}>
        <StateLabel>{title}</StateLabel>
        <Box
            paddingInline="space-32"
            paddingBlock="space-32"
            borderColor="neutral-strong"
            borderWidth="2 0 0 0"
            style={{ borderStyle: 'dashed' }}>
            <Box
                padding="space-32"
                maxWidth={'48rem'}
                style={{
                    background: 'var(--ax-bg-info-soft)',
                    border: '1px solid var(--a-border-subtle)',
                    // borderRadius: '8px',
                }}>
                {children}
            </Box>
        </Box>
    </VStack>
    // </Bleed>
);

const panelPreviewQueryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

export const PanelPreviewWrapper = ({ children }: { children: React.ReactNode }) => (
    <Theme hasBackground={false}>
        <IntlProvider locale="nb" messages={ungInnsyn_messages_nb}>
            <QueryClientProvider client={panelPreviewQueryClient}>
                <BrowserRouter basename="/">
                    <OppgavePageContext.Provider value={{ onCancel: fn(), onSuccess: fn() }}>
                        {children}
                    </OppgavePageContext.Provider>
                </BrowserRouter>
            </QueryClientProvider>
        </IntlProvider>
    </Theme>
);

/**
 * Setter status på en oppgave basert på ønsket tilstand.
 * - LØST: bruker besvart-varianten (har respons satt)
 * - AVBRUTT/UTLØPT: bruker base uten respons — panelet viser kun statusinfo
 */
export const getOppgaveMedStatus = <T extends Oppgave>(base: T, besvart: T, status: OppgaveStatus): T => {
    switch (status) {
        case OppgaveStatus.LØST:
            return { ...besvart, status: OppgaveStatus.LØST };
        case OppgaveStatus.AVBRUTT:
            return { ...base, status: OppgaveStatus.AVBRUTT, løstDato: new Date() } as T;
        case OppgaveStatus.UTLØPT:
            return { ...base, status: OppgaveStatus.UTLØPT, løstDato: new Date() } as T;
        default:
            return { ...base, status };
    }
};

/**
 * Generisk preview-renderer for standard oppgavepaneler (én datakonfigurasjon, ingen scenariovarianter).
 * Viser: forside uløst → ubesvart → kvittering → besvart → forside løst.
 * Bruk PanelPreviewWrapper rundt kallet i oversiktsstorien.
 */
export const renderOppgaveStandardStater = <T extends Oppgave>(
    oppgave: T,
    besvartOppgave: T,
    renderPanel: (oppgave: T, opts?: { initialVisKvittering?: boolean }) => React.ReactNode,
) => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[oppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">{renderPanel(oppgave)}</StoryBox>
        <StoryBox title="Kvittering">{renderPanel(oppgave, { initialVisKvittering: true })}</StoryBox>
        <StoryBox title="Besvart oppgave">{renderPanel(besvartOppgave)}</StoryBox>
        <StoryBox title="Forside — løst oppgave">
            <OppgaverList
                visBeskrivelse={false}
                oppgaveStatusTagVariant="text"
                oppgaver={[{ ...oppgave, status: OppgaveStatus.LØST }]}
            />
        </StoryBox>
    </VStack>
);
