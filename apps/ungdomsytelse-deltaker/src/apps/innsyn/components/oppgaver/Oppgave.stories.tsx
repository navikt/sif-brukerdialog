import { Oppgave, Oppgavetype } from '@navikt/ung-common';
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
    type: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    sluttdato: dayjs().add(1, 'day').toDate(),
    svarfrist: dayjs().add(1, 'day').toDate(),
};

const endretStartdato: Oppgave = {
    type: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    startdato: dayjs().add(1, 'day').toDate(),
    svarfrist: dayjs().add(1, 'day').toDate(),
};

export const EndretSluttdato: Story = {
    args: {
        oppgave: endretSluttdato,
    },
};
export const EndretStartdato: Story = {
    args: {
        oppgave: endretStartdato,
    },
};
