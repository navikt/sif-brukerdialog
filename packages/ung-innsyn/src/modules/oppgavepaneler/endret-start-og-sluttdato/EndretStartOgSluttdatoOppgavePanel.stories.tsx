import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { EndretStartOgSluttdatoOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { EndretStartOgSluttdatoOppgavePanel } from './EndretStartOgSluttdatoOppgavePanel';

const meta: Meta = {
    title: 'Oppgaver/5. Endret startdato og sluttdato',
    parameters: {},
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Story = StoryObj;

const oppgave: EndretStartOgSluttdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
    oppgavetypeData: {
        forrigePeriode: { from: dayjs('2025-05-04').toDate() },
        nyPeriode: {
            from: dayjs('2025-05-01').toDate(),
            to: dayjs('2025-08-01').toDate(),
        },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    sisteDatoEnKanSvare: dayjs().add(14, 'days').toDate(),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};

const besvartOppgave: EndretStartOgSluttdatoOppgave = {
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
    render: () => <EndretStartOgSluttdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" />,
};

export const Kvittering: Story = {
    name: 'Kvittering',
    render: () => (
        <EndretStartOgSluttdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
    ),
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <EndretStartOgSluttdatoOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />,
};

export const BesvartOppgaveMedTilbakemelding: Story = {
    name: 'Besvart oppgave med tilbakemelding',
    render: () => (
        <EndretStartOgSluttdatoOppgavePanel
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
        <EndretStartOgSluttdatoOppgavePanel
            oppgave={{ ...besvartOppgave, respons: undefined, status: OppgaveStatus.AVBRUTT }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => (
        <EndretStartOgSluttdatoOppgavePanel
            oppgave={{ ...besvartOppgave, respons: undefined, status: OppgaveStatus.UTLØPT }}
            navn="SNODIG VAFFEL"
        />
    ),
};
