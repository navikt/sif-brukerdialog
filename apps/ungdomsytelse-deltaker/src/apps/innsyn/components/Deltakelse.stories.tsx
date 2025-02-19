import { deltakelseSchema, Oppgavetype } from '@navikt/ung-common';
import { deltakelserHarSøkt } from '../../../../mock/msw/mocks/soker1/deltakelser/harSøkt';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import Deltakelse from './Deltakelse';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Deltakelse> = {
    component: Deltakelse,
    title: 'Deltakelse',
    parameters: {},
    decorators: [withPageWidth, withIntl],
};
export default meta;

type Story = StoryObj<typeof Deltakelse>;

const deltakelse = deltakelseSchema.parse(deltakelserHarSøkt[0]);
const oppgaver = deltakelse.oppgaver;

export const DeltakelseUtenOppgaver: Story = {
    name: 'Åpen timerapportering',
    args: {
        deltakelse: {
            ...deltakelse,
            oppgaver: [],
        },
    },
};

export const DeltakelseMedEndretStartdato: Story = {
    name: 'Endret startdato',
    args: {
        deltakelse: {
            ...deltakelse,
            oppgaver: oppgaver.filter((oppgave) => oppgave.type === Oppgavetype.BEKREFT_ENDRET_STARTDATO),
        },
    },
};

export const DeltakelseMedEndretSluttdato: Story = {
    name: 'Endret sluttdato',
    args: {
        deltakelse: {
            ...deltakelse,
            oppgaver: oppgaver.filter((oppgave) => oppgave.type === Oppgavetype.BEKREFT_ENDRET_SLUTTDATO),
        },
    },
};
