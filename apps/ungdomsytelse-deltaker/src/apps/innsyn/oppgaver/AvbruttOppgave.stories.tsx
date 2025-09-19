import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { withInnsynApp } from '../../../../storybook/decorators/withInnsynApp';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withQueryClient } from '../../../../storybook/decorators/withQueryClient';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import { EndretSluttdatoOppgave, RapporterInntektOppgave } from '../../../types/Oppgave';
import { EndretSluttdatoOppgavePage } from './endret-sluttdato/EndretSluttdatoOppgavePage';
import RapporterInntektOppgavePage from './rapporter-inntekt/RapporterInntektOppgavePage';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/Komponenter/Avbrutt og utløpt',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => withInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

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

export const AvbruttOppgave: Story = {
    name: 'Avbrutt oppgave',
    render: () => (
        <EndretSluttdatoOppgavePage
            oppgave={{ ...endretSluttdatoOppgave, bekreftelse: undefined, status: OppgaveStatus.AVBRUTT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const KansellertOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => (
        <EndretSluttdatoOppgavePage
            oppgave={{ ...endretSluttdatoOppgave, bekreftelse: undefined, status: OppgaveStatus.UTLØPT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const LukketOppgave: Story = {
    name: 'Lukket oppgave',
    render: () => (
        <RapporterInntektOppgavePage
            oppgave={{ ...rapporterInntektOppgave, status: OppgaveStatus.LUKKET }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};
