import type { Meta, StoryObj } from '@storybook/react-vite';
import { EndretStartdatoOppgave, OppgaveStatus, Oppgavetype } from '@navikt/ung-common';
import dayjs from 'dayjs';
import { withInnsynApp } from '../../../../../storybook/decorators/withInnsynApp';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withQueryClient } from '../../../../../storybook/decorators/withQueryClient';
import { withRouter } from '../../../../../storybook/decorators/withRouter';
import { EndretStartdatoOppgavePage } from '../endret-startdato/EndretStartdatoOppgavePage';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/Endret startdato',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => withInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

const endretSluttdatoOppgave: EndretStartdatoOppgave = {
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

const besvart_endretSluttdatoOppgave: EndretStartdatoOppgave = {
    ...endretSluttdatoOppgave,
    bekreftelse: {
        harGodtattEndringen: true,
    },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const UbesvartOppgave: Story = {
    name: 'Ubesvart oppgave',
    render: () => <EndretStartdatoOppgavePage oppgave={endretSluttdatoOppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <EndretStartdatoOppgavePage oppgave={besvart_endretSluttdatoOppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const BesvartOppgaveMedTilbakemelding: Story = {
    name: 'Besvart oppgave med tilbakemelding',
    render: () => (
        <EndretStartdatoOppgavePage
            oppgave={{
                ...besvart_endretSluttdatoOppgave,
                bekreftelse: {
                    harGodtattEndringen: false,
                    uttalelseFraBruker:
                        'Lore, ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
            }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};
