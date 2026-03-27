import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype, RapporterInntektOppgave } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { RapporterInntektOppgavePanel } from './RapporterInntektOppgavePanel';
const meta: Meta = {
    title: 'Oppgaver/8. Rapporter inntekt',
    parameters: {},
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Story = StoryObj;

const oppgave: RapporterInntektOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
        gjelderDelerAvMåned: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs('2025-06-01').toDate(),
    sisteDatoEnKanSvare: dayjs('2025-06-06').startOf('day').toDate(),
};

const besvartOppgave: RapporterInntektOppgave = {
    ...oppgave,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
        gjelderDelerAvMåned: false,
    },
    respons: {
        type: 'RAPPORTERT_INNTEKT',
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
        arbeidstakerOgFrilansInntekt: 10000,
    },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().subtract(1, 'days').toDate(),
};

const utløptUbesvartOppgave: RapporterInntektOppgave = {
    oppgaveReferanse: 'ab0a18f8-8a6e-485b-b2b6-8d43a438165d',
    oppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-09-01').toDate(),
        tilOgMed: dayjs('2025-09-30').toDate(),
        gjelderDelerAvMåned: false,
    },
    respons: undefined,
    status: OppgaveStatus.UTLØPT,
    opprettetDato: dayjs('2025-10-01T05:00:29.527840Z').toDate(),
    løstDato: dayjs('2025-10-08T05:00:54.739162Z').toDate(),
    åpnetDato: dayjs('2025-10-23T06:34:31.260740Z').toDate(),
    lukketDato: undefined,
    sisteDatoEnKanSvare: dayjs('2025-10-08T00:00:00Z').toDate(),
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
    render: () => <RapporterInntektOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" />,
};

export const KvitteringHarInntekt: Story = {
    name: 'Kvittering - med inntekt',
    render: () => (
        <RapporterInntektOppgavePanel
            oppgave={oppgave}
            navn="SNODIG VAFFEL"
            initialKvitteringData={{ harHattInntektOver0: true }}
        />
    ),
};

export const KvitteringUtenInntekt: Story = {
    name: 'Kvittering - uten inntekt',
    render: () => (
        <RapporterInntektOppgavePanel
            oppgave={oppgave}
            navn="SNODIG VAFFEL"
            initialKvitteringData={{ harHattInntektOver0: false }}
        />
    ),
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <RapporterInntektOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />,
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => <RapporterInntektOppgavePanel oppgave={utløptUbesvartOppgave} navn="SNODIG VAFFEL" />,
};
