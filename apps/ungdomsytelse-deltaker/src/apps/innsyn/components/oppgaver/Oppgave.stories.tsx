import dayjs from 'dayjs';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../../storybook/decorators/withPageWidth';
import { Oppgave, Oppgavetype } from '../../../../api/schemas/oppgaveSchema';

import type { Meta, StoryObj } from '@storybook/react';
import OppgavePanel from './OppgavePanel';

const meta: Meta<typeof OppgavePanel> = {
    component: OppgavePanel,
    title: 'Oppgaver',
    parameters: {},
    decorators: [withPageWidth, withIntl],
};
export default meta;

type Story = StoryObj<typeof OppgavePanel>;

const endretSluttdato: Oppgave = {
    type: Oppgavetype.bekreftEndretSluttdato,
    sluttdato: dayjs().add(1, 'day').toDate(),
    svarfrist: dayjs().add(1, 'day').toDate(),
};

const endretStartdato: Oppgave = {
    type: Oppgavetype.bekreftEndretStartdato,
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
