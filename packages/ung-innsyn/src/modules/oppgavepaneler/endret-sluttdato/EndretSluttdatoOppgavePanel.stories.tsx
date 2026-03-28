import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { EndretSluttdatoOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { EndretSluttdatoOppgavePanel } from './EndretSluttdatoOppgavePanel';

const meta: Meta = {
    title: 'Oppgaver/3. Endret sluttdato',
    parameters: {},
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Story = StoryObj;

const oppgave: EndretSluttdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: dayjs('2025-05-01').toDate(),
        forrigeSluttdato: dayjs('2025-04-01').toDate(),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    sisteDatoEnKanSvare: dayjs().add(14, 'days').toDate(),
};

const besvartOppgave: EndretSluttdatoOppgave = {
    ...oppgave,
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const OppgavePanel: Story = {
    name: 'Oppgavevisning på forside',
    render: () => (
        <VStack gap="space-40">
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Uløst oppgave
                </Heading>
                <OppgaverList oppgaver={[oppgave]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...oppgave, status: OppgaveStatus.AVBRUTT },
                        { ...oppgave, status: OppgaveStatus.UTLØPT },
                        { ...oppgave, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const UbesvartOppgave: Story = {
    name: 'Ubesvart oppgave',
    render: () => <EndretSluttdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" />,
};

export const OppgaveKvittering: Story = {
    name: 'Kvittering',
    render: () => <EndretSluttdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />,
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <EndretSluttdatoOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />,
};

export const BesvartOppgaveMedTilbakemelding: Story = {
    name: 'Besvart oppgave med tilbakemelding',
    render: () => (
        <EndretSluttdatoOppgavePanel
            oppgave={{
                ...besvartOppgave,
                respons: {
                    type: 'VARSEL_SVAR',
                    harUttalelse: true,
                    uttalelseFraBruker:
                        'Lore, ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
            }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const AvbruttOppgave: Story = {
    name: 'Avbrutt oppgave',
    render: () => (
        <EndretSluttdatoOppgavePanel
            oppgave={{ ...besvartOppgave, respons: undefined, status: OppgaveStatus.AVBRUTT }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => (
        <EndretSluttdatoOppgavePanel
            oppgave={{ ...besvartOppgave, respons: undefined, status: OppgaveStatus.UTLØPT }}
            navn="SNODIG VAFFEL"
        />
    ),
};
