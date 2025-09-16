import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { withInnsynApp } from '../../../../../storybook/decorators/withInnsynApp';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import OppgaveStatusInfo from './OppgaveStatusInfo';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/Komponenter/OppgaveStatusInfo',
    parameters: {},
    decorators: [withIntl, (Story) => withInnsynApp(Story, { withHeader: false })],
};
export default meta;

type Story = StoryObj;

export const AlleStatuser: Story = {
    name: 'Alle varianter',
    render: () => (
        <VStack gap="10">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Utløpt oppgave
                </Heading>
                <OppgaveStatusInfo oppgaveStatus={OppgaveStatus.UTLØPT} />
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Avbrutt oppgave
                </Heading>
                <OppgaveStatusInfo oppgaveStatus={OppgaveStatus.AVBRUTT} />
            </VStack>
        </VStack>
    ),
};
