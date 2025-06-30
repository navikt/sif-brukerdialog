import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';
import { harSøktMock } from '../../../../../mock/scenarios/data/harSøkt';
import { withDeltakerContext } from '../../../../../storybook/decorators/withDeltakerContext';
import { withInnsynApp } from '../../../../../storybook/decorators/withInnsynApp';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../../storybook/decorators/withRouter';
import DeltakelseContent from './DeltakelseContent';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeltakelsePeriode, deltakelsePeriodeSchema } from '../../../../types/DeltakelsePeriode';
const meta: Meta<typeof DeltakelseContent> = {
    component: DeltakelseContent,
    title: 'Innsyn/Sider/Forside',
    parameters: {},
    decorators: [
        withIntl,
        withRouter,
        withDeltakerContext,
        (Story) => withInnsynApp(Story, { startdato: new Date(), frontpageFooter: true, withHeader: true }),
    ],
};
export default meta;

type Story = StoryObj<typeof DeltakelseContent>;

const deltakelsePeriode: DeltakelsePeriode = deltakelsePeriodeSchema.parse(harSøktMock.deltakelser[0]);

export const AktivDeltakelse: Story = {
    name: 'Aktiv deltakelse',
    args: {
        deltakelsePeriode: {
            ...deltakelsePeriode,
            programPeriode: {
                from: dayjs().subtract(2, 'days').toDate(),
            },
        },
    },
};

export const DeltakelseIkkeStartet: Story = {
    name: 'Deltakelse ikke startet',
    args: {
        deltakelsePeriode: {
            ...deltakelsePeriode,
            programPeriode: {
                from: dayjs().add(2, 'days').toDate(),
            },
            oppgaver: deltakelsePeriode.oppgaver.filter((o) => o.oppgavetype === Oppgavetype.SØK_YTELSE),
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
            oppgaver: deltakelsePeriode.oppgaver.filter((o) => o.status !== OppgaveStatus.ULØST),
        },
    },
};
