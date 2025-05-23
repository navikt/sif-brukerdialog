import { ISODateToDate } from '@navikt/sif-common-utils';
import { Oppgave, OppgaveStatus, Oppgavetype } from '@navikt/ung-common';
import dayjs from 'dayjs';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../../storybook/decorators/withPageWidth';
import { withQueryClient } from '../../../../../storybook/decorators/withQueryClient';
import OppgaveWrapper from './OppgaveWrapper';

import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof OppgaveWrapper> = {
    component: OppgaveWrapper,
    title: 'Oppgaver',
    parameters: {},
    decorators: [withPageWidth, withIntl, withQueryClient],
};
export default meta;

type Story = StoryObj<typeof OppgaveWrapper>;

const endretProgramperiode: Oppgave = {
    oppgaveReferanse: '123',
    opprettetDato: ISODateToDate('2024-07-01'),
    status: OppgaveStatus.ULØST,
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
    oppgavetypeData: {
        fraOgMed: ISODateToDate('2024-06-01'),
        tilOgMed: ISODateToDate('2024-07-01'),
    },
    svarfrist: dayjs().add(1, 'day').toDate(),
};

const korrigertInntekt: Oppgave = {
    oppgaveReferanse: '123',
    opprettetDato: ISODateToDate('2024-07-01'),
    status: OppgaveStatus.ULØST,
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: ISODateToDate('2026-01-01'),
        tilOgMed: ISODateToDate('2026-01-31'),
        registerinntekt: {
            arbeidOgFrilansInntekter: [
                {
                    arbeidsgiver: 'Flåklypa barteservice',
                    inntekt: 1232,
                },
                {
                    arbeidsgiver: 'Hopen klyp og klem',
                    inntekt: 50,
                },
            ],
            ytelseInntekter: [
                {
                    ytelsetype: 'Sykepenger',
                    inntekt: 4200,
                },
            ],
        },
    },
    svarfrist: dayjs().add(1, 'day').toDate(),
};

export const EndretSluttdato: Story = {
    args: {
        oppgave: endretProgramperiode,
        programPeriode: {
            from: dayjs().subtract(1, 'day').toDate(),
            to: dayjs().add(1, 'day').toDate(),
        },
    },
};

export const BekreftKorrigertInntektOppgittInntekt: Story = {
    args: {
        oppgave: {
            ...korrigertInntekt,
            oppgavetypeData: {
                ...korrigertInntekt.oppgavetypeData,
            },
        },
        programPeriode: {
            from: dayjs().subtract(1, 'day').toDate(),
            to: dayjs().add(1, 'day').toDate(),
        },
    },
};
export const BekreftKorrigertInntekt: Story = {
    args: {
        oppgave: korrigertInntekt,
        programPeriode: {
            from: dayjs().subtract(1, 'day').toDate(),
            to: dayjs().add(1, 'day').toDate(),
        },
    },
};
