import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { SøkYtelseOppgavePanel } from './SokYtelseOppgavePanel';
import { mockSøkYtelseBesvartUPY, mockSøkYtelseUPY } from './SøkYtelseOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/Ungdomsprogramytelsen/Søk ytelsen',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Story = StoryObj;

export const Forsidevisning: Story = {
    name: 'Forsidevisning',
    parameters: { controls: { disable: true } },
    render: () => (
        <VStack gap="space-40">
            <VStack gap="space-16">
                <Heading level="2" size="medium">Uløst oppgave</Heading>
                <OppgaverList oppgaver={[mockSøkYtelseUPY]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">Løste oppgaver</Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockSøkYtelseUPY, status: OppgaveStatus.AVBRUTT },
                        { ...mockSøkYtelseUPY, status: OppgaveStatus.UTLØPT },
                        { ...mockSøkYtelseUPY, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    parameters: { controls: { disable: true } },
    render: () => <SøkYtelseOppgavePanel oppgave={mockSøkYtelseUPY} dokumentarkivUrl="https://example.com/docs" />,
};

export const Besvart: Story = {
    name: 'Besvart',
    parameters: { controls: { disable: true } },
    render: () => <SøkYtelseOppgavePanel oppgave={mockSøkYtelseBesvartUPY} dokumentarkivUrl="https://example.com/docs" />,
};

export const Utløpt: Story = {
    name: 'Utløpt',
    parameters: { controls: { disable: true } },
    render: () => (
        <SøkYtelseOppgavePanel
            oppgave={{ ...mockSøkYtelseUPY, status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            dokumentarkivUrl="https://example.com/docs"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <SøkYtelseOppgavePanel
            oppgave={{ ...mockSøkYtelseUPY, status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            dokumentarkivUrl="https://example.com/docs"
        />
    ),
};
