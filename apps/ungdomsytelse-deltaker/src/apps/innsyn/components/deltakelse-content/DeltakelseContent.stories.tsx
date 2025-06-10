import { DeltakelsePeriode, deltakelsePeriodeSchema } from '@navikt/ung-common';
import dayjs from 'dayjs';
import { withDeltakerContext } from '../../../../../storybook/decorators/withDeltakerContext';
import { withInnsynApp } from '../../../../../storybook/decorators/withInnsynApp';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../../storybook/decorators/withRouter';
import DeltakelseContent from './DeltakelseContent';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { harSøktMock } from '../../../../../mock/scenarios/data/harSøkt';
const meta: Meta<typeof DeltakelseContent> = {
    component: DeltakelseContent,
    title: 'Forside',
    parameters: {},
    decorators: [withIntl, withRouter, withDeltakerContext, withInnsynApp],
};
export default meta;

type Story = StoryObj<typeof DeltakelseContent>;

const deltakelsePeriode: DeltakelsePeriode = deltakelsePeriodeSchema.parse(harSøktMock.deltakelser[0]);

export const AktivDeltakelseMedInfo: Story = {
    name: 'Aktiv deltakelse - med info om inntektsrapportering',
    args: {
        deltakelsePeriode: {
            ...deltakelsePeriode,
        },
    },
};

export const AktivDeltakelseUtenInfo: Story = {
    name: 'Aktiv deltakelse - uten info om inntektsrapportering',
    args: {
        deltakelsePeriode: {
            ...deltakelsePeriode,
        },
    },
};

export const DeltakelseAvsluttet: Story = {
    name: 'Deltakelse er avsluttet',
    args: {
        deltakelsePeriode: {
            ...deltakelsePeriode,
            programPeriode: {
                from: dayjs().subtract(1, 'year').toDate(),
                to: dayjs().subtract(1, 'day').toDate(),
            },
            oppgaver: [],
        },
    },
};
