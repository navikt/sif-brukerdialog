import {
    BekreftEndretSluttdatoOppgave,
    BekreftEndretStartdatoOppgave,
    deltakelseSchema,
    Oppgavestatus,
    Oppgavetype,
} from '@navikt/ung-common';
import { deltakelserHarSøkt } from '../../../../mock/msw/mocks/soker1/deltakelser/harSøkt';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import Deltakelse from './Deltakelse';

import type { Meta, StoryObj } from '@storybook/react';
import { ISODateToDate } from '@navikt/sif-common-utils';

const endretStartdatoOppgave: BekreftEndretStartdatoOppgave = {
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    id: '123',
    opprettetDato: ISODateToDate('2024-07-01'),
    status: Oppgavestatus.ULØST,
    startdato: ISODateToDate('2024-07-01'),
    svarfrist: ISODateToDate('2024-07-31'),
};

const endretSluttdatoOppgave: BekreftEndretSluttdatoOppgave = {
    id: '123',
    opprettetDato: ISODateToDate('2024-07-01'),
    status: Oppgavestatus.ULØST,
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    sluttdato: ISODateToDate('2024-07-01'),
    svarfrist: ISODateToDate('2024-07-31'),
};

const meta: Meta<typeof Deltakelse> = {
    component: Deltakelse,
    title: 'Deltakelse',
    parameters: {},
    decorators: [withPageWidth, withIntl],
};
export default meta;

type Story = StoryObj<typeof Deltakelse>;

const deltakelse = deltakelseSchema.parse(deltakelserHarSøkt[0]);

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
            oppgaver: [endretStartdatoOppgave],
        },
    },
};

export const DeltakelseMedEndretSluttdato: Story = {
    name: 'Endret sluttdato',
    args: {
        deltakelse: {
            ...deltakelse,
            oppgaver: [endretSluttdatoOppgave],
        },
    },
};
