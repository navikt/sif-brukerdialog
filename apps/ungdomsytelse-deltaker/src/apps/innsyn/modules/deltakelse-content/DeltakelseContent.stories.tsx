import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { harSøktMock } from '@shared/mock/scenarios/data/harSøkt';
import { withDeltakerContext } from '@shared/storybook/decorators/withDeltakerContext';
import { withInnsynApp } from '@shared/storybook/decorators/withInnsynApp';
import { withIntl } from '@shared/storybook/decorators/withIntl';
import { withRouter } from '@shared/storybook/decorators/withRouter';
import { DeltakelsePeriode, deltakelsePeriodeSchema } from '@shared/types/DeltakelsePeriode';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import DeltakelseContent from './DeltakelseContent';
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
