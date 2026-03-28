import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype, SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { SøkYtelseOppgavePanel } from './SokYtelseOppgavePanel';
const meta: Meta = {
    title: 'Oppgaver/1. Søk ytelsen',
    parameters: {},
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Story = StoryObj;

const oppgave: SøkYtelseOppgave = {
    oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
    oppgavetype: ParsedOppgavetype.SØK_YTELSE,
    oppgavetypeData: {
        fomDato: new Date('2025-05-01'),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs.utc('2025-05-31T03:58:01.779214Z').toDate(),
    sisteDatoEnKanSvare: dayjs.utc('2025-06-14T03:58:01.779214Z').toDate(),
};

const besvartOppgave: SøkYtelseOppgave = {
    ...oppgave,
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};
export const OppgavePanel: Story = {
    name: 'Oppgavevisning på forside',
    render: () => (
        <VStack gap="space-40">
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[{ ...oppgave, status: OppgaveStatus.LØST }]}
                />
            </VStack>
        </VStack>
    ),
};

export const UbesvartOppgave: Story = {
    name: 'Ubesvart oppgave',
    render: () => <SøkYtelseOppgavePanel oppgave={oppgave} />,
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <SøkYtelseOppgavePanel oppgave={besvartOppgave} />,
};
