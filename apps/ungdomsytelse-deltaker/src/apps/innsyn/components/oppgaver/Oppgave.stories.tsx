import { ISODateToDate } from '@navikt/sif-common-utils';
import { Oppgave, OppgaveStatus, Oppgavetype } from '@navikt/ung-common';
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
    id: '123',
    opprettetDato: ISODateToDate('2024-07-01'),
    status: OppgaveStatus.ULØST,
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        veilederRef: 'Ref',
        nySluttdato: ISODateToDate('2024-07-01'),
    },
    svarfrist: dayjs().add(1, 'day').toDate(),
};

const endretStartdato: Oppgave = {
    id: '123',
    opprettetDato: ISODateToDate('2024-07-01'),
    status: OppgaveStatus.ULØST,
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        veilederRef: 'Ref',
        nyStartdato: dayjs().add(1, 'day').toDate(),
    },
    svarfrist: dayjs().add(1, 'day').toDate(),
};

const korrigertInntekt: Oppgave = {
    id: '123',
    opprettetDato: ISODateToDate('2024-07-01'),
    status: OppgaveStatus.ULØST,
    oppgavetype: Oppgavetype.BEKREFT_KORRIGERT_INNTEKT,
    oppgavetypeData: {
        periodeForInntekt: {
            fraOgMed: ISODateToDate('2026-01-01'),
            tilOgMed: ISODateToDate('2026-01-31'),
        },
        inntektFraAinntekt: {
            arbeidsgivere: [
                {
                    navn: 'Flåklypa barteservice',
                    beløp: 1232,
                },
                {
                    navn: 'Hopen klyp og klem',
                    beløp: 50,
                },
            ],
            ytelser: [
                {
                    navn: 'Sykepenger',
                    beløp: 4200,
                },
            ],
        },
        inntektFraDeltaker: {
            arbeidstakerOgFrilansInntekt: undefined,
            inntektFraYtelse: undefined,
        },
    },
    svarfrist: dayjs().add(1, 'day').toDate(),
};

export const EndretSluttdato: Story = {
    args: {
        oppgave: endretSluttdato,
        programPeriode: {
            from: dayjs().subtract(1, 'day').toDate(),
            to: dayjs().add(1, 'day').toDate(),
        },
    },
};
export const EndretStartdato: Story = {
    args: {
        oppgave: endretStartdato,
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
                inntektFraDeltaker: {
                    arbeidstakerOgFrilansInntekt: 1200,
                    inntektFraYtelse: 550,
                },
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
