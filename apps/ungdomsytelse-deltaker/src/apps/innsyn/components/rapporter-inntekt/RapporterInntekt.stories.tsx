import type { Meta, StoryObj } from '@storybook/react';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../../storybook/decorators/withPageWidth';
import RapporterInntekt from './RapporterInntekt';

const rapporteringsperiode: Rapporteringsperiode = {
    harRapportert: true,
    kanRapportere: true,
    fristForRapportering: ISODateToDate('2025-01-31'),
    periode: {
        from: ISODateToDate('2025-01-01'),
        to: ISODateToDate('2025-01-31'),
    },
    inntekt: {
        arbeidOgFrilansInntekter: 0,
        ytelseInntekter: 0,
        summertInntekt: 0,
    },
};

const meta: Meta<typeof RapporterInntekt> = {
    title: 'Komponenter/Fremhevet inntektsperiode',
    component: RapporterInntekt,
    decorators: [withIntl, withPageWidth],
    args: {
        rapporteringsperiode: rapporteringsperiode,
    },
};
export default meta;

type Story = StoryObj<typeof RapporterInntekt>;

export const IkkeRapportertPeriode: Story = {
    name: 'Åpen - uten inntekt',
    args: {
        rapporteringsperiode: {
            ...rapporteringsperiode,
            harRapportert: false,
        },
    },
};

export const RapportertPeriode: Story = {
    name: 'Åpen - med inntekt',
    args: {
        rapporteringsperiode: {
            ...rapporteringsperiode,
            harRapportert: true,
            kanRapportere: true,
            inntekt: {
                arbeidOgFrilansInntekter: 1500,
                ytelseInntekter: 0,
                summertInntekt: 1500,
            },
        },
    },
};
