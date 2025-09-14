import { Heading, VStack } from '@navikt/ds-react';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { withInnsynApp } from '../../../../../storybook/decorators/withInnsynApp';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withQueryClient } from '../../../../../storybook/decorators/withQueryClient';
import { withRouter } from '../../../../../storybook/decorators/withRouter';
import { SøkYtelseOppgave } from '../../../../types/Oppgave';
import OppgaverList from '../../components/oppgaver-list/OppgaverList';
import SøkYtelseOppgavePage from './SøkYtelseOppgavePage';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/Søk ytelsen',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => withInnsynApp(Story)],
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
    frist: dayjs.utc('2025-06-14T03:58:01.779214Z').toDate(),
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
    name: 'Oppgavepaneler',
    render: () => (
        <VStack gap="10">
            <VStack gap="4">
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
