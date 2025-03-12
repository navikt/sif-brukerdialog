import { ISODateToDate } from '@navikt/sif-common-utils';
import { Oppgave, OppgaveStatus, Oppgavetype } from '@navikt/ung-common';
import dayjs from 'dayjs';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../../storybook/decorators/withPageWidth';
import OppgavePanel from './OppgavePanel';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OppgavePanel> = {
    component: OppgavePanel,
    title: 'Oppgaver',
    parameters: {},
    decorators: [withPageWidth, withIntl],
};
export default meta;

type Story = StoryObj<typeof OppgavePanel>;

const endretSluttdato: Oppgave = {
    id: '123',
    opprettetDato: ISODateToDate('2024-07-01'),
    status: OppgaveStatus.ULØST,
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        veilederRef: 'Ref',
        nySluttdato: ISODateToDate('2024-07-01'),
    },
    svarfrist: dayjs().add(1, 'day').toDate(),
};

const endretStartdato: Oppgave = {
    id: '123',
    opprettetDato: ISODateToDate('2024-07-01'),
    status: OppgaveStatus.ULØST,
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        veilederRef: 'Ref',
        nyStartdato: dayjs().add(1, 'day').toDate(),
    },
    svarfrist: dayjs().add(1, 'day').toDate(),
};

export const EndretSluttdato: Story = {
    args: {
        oppgave: endretSluttdato,
        programPeriode: {
            from: dayjs().subtract(1, 'day').toDate(),
            to: dayjs().add(1, 'day').toDate(),
        },
    },
};
export const EndretStartdato: Story = {
    args: {
        oppgave: endretStartdato,
        programPeriode: {
            from: dayjs().subtract(1, 'day').toDate(),
            to: dayjs().add(1, 'day').toDate(),
        },
    },
};
