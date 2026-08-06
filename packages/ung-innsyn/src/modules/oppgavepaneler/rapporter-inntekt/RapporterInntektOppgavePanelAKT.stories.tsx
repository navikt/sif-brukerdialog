import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype, RapporterInntektOppgave } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { RapporterInntektOppgavePanel } from './RapporterInntektOppgavePanel';

const meta: Meta = {
    title: 'Oppgaver/Aktivitetspenger/Rapporter inntekt',
    parameters: {},
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Story = StoryObj;

const oppgave: RapporterInntektOppgave = {
    oppgaveYtelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    parsedOppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
    oppgavetypeData: {
        fraOgMed: '2025-05-01' as ISODate,
        tilOgMed: '2025-05-31' as ISODate,
        gjelderDelerAvMåned: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs('2025-06-01').toDate(),
    frist: dateToISODate(dayjs('2025-06-06').startOf('day')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};

const besvartOppgave: RapporterInntektOppgave = {
    ...oppgave,
    respons: {
        type: 'RAPPORTERT_INNTEKT',
        fraOgMed: '2025-05-01' as ISODate,
        tilOgMed: '2025-05-31' as ISODate,
        arbeidstakerOgFrilansInntekt: 10000,
    },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().subtract(1, 'days').toDate(),
};

const utløptUbesvartOppgave: RapporterInntektOppgave = {
    ...oppgave,
    oppgaveReferanse: 'ab0a18f8-8a6e-485b-b2b6-8d43a438165d',
    oppgavetypeData: {
        fraOgMed: '2025-09-01' as ISODate,
        tilOgMed: '2025-09-30' as ISODate,
        gjelderDelerAvMåned: false,
    },
    respons: undefined,
    status: OppgaveStatus.UTLØPT,
    opprettetDato: dayjs('2025-10-01').toDate(),
    løstDato: dayjs('2025-10-08').toDate(),
    frist: dateToISODate(dayjs('2025-10-08')),
};

export const OppgavePanel: Story = {
    name: 'Oppgavevisning på forside',
    render: () => (
        <VStack gap="space-40">
            <VStack gap="space-16">
                <Heading level="2" size="medium">Uløst oppgave</Heading>
                <OppgaverList oppgaver={[oppgave]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">Løste oppgaver</Heading>
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
    render: () => <RapporterInntektOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" initialKvitteringData={{ harHattInntektOver0: true }} />,
};

export const KvitteringUtenInntekt: Story = {
    name: 'Kvittering - uten inntekt',
    render: () => <RapporterInntektOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" initialKvitteringData={{ harHattInntektOver0: false }} />,
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <RapporterInntektOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />,
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => <RapporterInntektOppgavePanel oppgave={utløptUbesvartOppgave} navn="SNODIG VAFFEL" />,
};
