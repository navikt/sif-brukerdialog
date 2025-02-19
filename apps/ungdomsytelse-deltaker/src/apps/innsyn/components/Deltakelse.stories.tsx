import { deltakelserHarSøkt } from '../../../../mock/msw/mocks/soker1/deltakelser/harSøkt';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import { deltakelseSchema } from '../../../api/schemas/deltakelseSchema';
import { Oppgavetype } from '../../../api/schemas/oppgaveSchema';
import Deltakelse from './Deltakelse';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Deltakelse> = {
    component: Deltakelse,
    title: 'Content/Deltakelse',
    parameters: {},
    decorators: [withPageWidth, withIntl],
};
export default meta;

type Story = StoryObj<typeof Deltakelse>;

const deltakelse = deltakelseSchema.parse(deltakelserHarSøkt[0]);
const oppgaver = deltakelse.oppgaver;

export const DeltakelseUtenOppgaver: Story = {
    name: 'Deltakelse med timerapportering',
    args: {
        deltakelse: {
            ...deltakelse,
            oppgaver: [],
        },
    },
};

export const DeltakelseMedEndretStartdato: Story = {
    name: 'Deltakelse med endret startdato',
    args: {
        deltakelse: {
            ...deltakelse,
            oppgaver: oppgaver.filter((oppgave) => oppgave.type === Oppgavetype.bekreftEndretStartdato),
        },
    },
};

export const DeltakelseMedEndretSluttdato: Story = {
    name: 'Deltakelse med endret sluttdato',
    args: {
        deltakelse: {
            ...deltakelse,
            oppgaver: oppgaver.filter((oppgave) => oppgave.type === Oppgavetype.bekreftEndretSluttdato),
        },
    },
};
