import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    EndretSluttdatoOppgave,
    EndretStartdatoOppgave,
    OppgaveStatus,
    Oppgavetype,
    RapporterInntektOppgave,
} from '@navikt/ung-common';
import dayjs from 'dayjs';
import { withInnsynApp } from '../../../../../storybook/decorators/withInnsynApp';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withQueryClient } from '../../../../../storybook/decorators/withQueryClient';
import { withRouter } from '../../../../../storybook/decorators/withRouter';
import OppgaverList from './OppgaverList';
import { Heading, VStack } from '@navikt/ds-react';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/Oppgaveliste',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => withInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

/**
 * Endre sluttdato oppgave
 */

const endretSluttdatoOppgave: EndretSluttdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: dayjs('2025-05-01').toDate(),
        forrigeSluttdato: undefined,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dayjs().add(14, 'days').toDate(),
};

export const EndretSluttdato: Story = {
    name: 'Endret sluttdato',
    render: () => (
        <VStack gap="10">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Uløst oppgave
                </Heading>
                <OppgaverList oppgaver={[endretSluttdatoOppgave]} />
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...endretSluttdatoOppgave, status: OppgaveStatus.AVBRUTT },
                        { ...endretSluttdatoOppgave, status: OppgaveStatus.UTLØPT },
                        { ...endretSluttdatoOppgave, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

/**
 * Endre startdato oppgave
 */

const endretStartdatoOppgave: EndretStartdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: dayjs('2025-05-01').toDate(),
        forrigeStartdato: dayjs('2025-05-05').toDate(),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dayjs().add(14, 'days').toDate(),
};

export const EndretStartdato: Story = {
    name: 'Endret startdato',
    render: () => (
        <VStack gap="10">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Uløst oppgave
                </Heading>
                <OppgaverList oppgaver={[endretStartdatoOppgave]} />
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...endretStartdatoOppgave, status: OppgaveStatus.AVBRUTT },
                        { ...endretStartdatoOppgave, status: OppgaveStatus.UTLØPT },
                        { ...endretStartdatoOppgave, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

/**
 * Rapporter inntekt oppgave
 */

const rapporterInntektOppgave: RapporterInntektOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs('2025-06-01').toDate(),
    frist: dayjs('2025-06-06').startOf('day').toDate(),
};

export const RapporterInntekt: Story = {
    name: 'Rapporter inntekt',
    render: () => (
        <VStack gap="10">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Uløst oppgave
                </Heading>
                <OppgaverList oppgaver={[rapporterInntektOppgave]} />
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...rapporterInntektOppgave, status: OppgaveStatus.AVBRUTT },
                        { ...rapporterInntektOppgave, status: OppgaveStatus.UTLØPT },
                        { ...rapporterInntektOppgave, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};
