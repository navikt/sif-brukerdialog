import OppgaverList from '@innsyn/components/oppgaver-list/OppgaverList';
import { Heading, VStack } from '@navikt/ds-react';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useWithInnsynApp } from '@shared/storybook/decorators/withInnsynApp';
import { withIntl } from '@shared/storybook/decorators/withIntl';
import { withQueryClient } from '@shared/storybook/decorators/withQueryClient';
import { withRouter } from '@shared/storybook/decorators/withRouter';
import { SøkYtelseOppgave } from '@shared/types/Oppgave';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import SøkYtelseOppgavePage from './SøkYtelseOppgavePage';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/1. Søk ytelsen',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => useWithInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

const oppgave: SøkYtelseOppgave = {
    oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
    oppgavetype: Oppgavetype.SØK_YTELSE,
    oppgavetypeData: {
        fomDato: ISODateToDate('2025-05-01'),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs.utc('2025-05-31T03:58:01.779214Z').toDate(),
    sisteDatoEnKanSvare: dayjs.utc('2025-06-14T03:58:01.779214Z').toDate(),
};

const besvartOppgave: SøkYtelseOppgave = {
    ...oppgave,
    bekreftelse: {
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
    render: () => <SøkYtelseOppgavePage oppgave={oppgave} />,
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <SøkYtelseOppgavePage oppgave={besvartOppgave} />,
};
