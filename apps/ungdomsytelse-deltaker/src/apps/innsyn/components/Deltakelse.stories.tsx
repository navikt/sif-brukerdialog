import { DeltakelsePeriode, deltakelsePeriodeSchema } from '@navikt/ung-common';
import dayjs from 'dayjs';
import { harSøktMock } from '../../../../mock/msw/mocks/scenarioes/har-søkt';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import DeltakelseContent from './DeltakelseContent';

import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof DeltakelseContent> = {
    component: DeltakelseContent,
    title: 'DeltakelseContent',
    parameters: {},
    decorators: [withPageWidth, withIntl],
};
export default meta;

type Story = StoryObj<typeof DeltakelseContent>;

const deltakelse: DeltakelsePeriode = deltakelsePeriodeSchema.parse(harSøktMock.deltakelser[0]);

export const DeltakelseIkkeStartet: Story = {
    name: 'Deltakelse ikke startet',
    args: {
        deltakelse: {
            ...deltakelse,
            programPeriode: {
                from: dayjs().add(2, 'days').toDate(),
                to: undefined,
            },
            oppgaver: [],
        },
    },
};
export const DeltakelseAvsluttet: Story = {
    name: 'Deltakelse er avsluttet',
    args: {
        deltakelse: {
            ...deltakelse,
            programPeriode: {
                from: dayjs().subtract(1, 'year').toDate(),
                to: dayjs().subtract(1, 'day').toDate(),
            },
            oppgaver: [],
        },
    },
};
