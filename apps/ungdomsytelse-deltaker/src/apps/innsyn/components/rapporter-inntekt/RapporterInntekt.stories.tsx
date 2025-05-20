import type { Meta, StoryObj } from '@storybook/react';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import { withDeltakerContext } from '../../../../../storybook/decorators/withDeltakerContext';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../../storybook/decorators/withPageWidth';
import RapporterInntekt from './RapporterInntekt';
import { withRouter } from '../../../../../storybook/decorators/withRouter';
import { withQueryClient } from '../../../../../storybook/decorators/withQueryClient';

const rapporteringsperiode: Rapporteringsperiode = {
    harRapportert: false,
    periode: {
        from: ISODateToDate('2025-01-01'),
        to: ISODateToDate('2025-01-31'),
    },
    arbeidstakerOgFrilansInntekt: 0,
    erÅpenRapporteringsperiode: false,
    inntektFraYtelse: 0,
    summertInntekt: 0,
};

const meta: Meta<typeof RapporterInntekt> = {
    title: 'Komponenter/Rapporter inntekt',
    component: RapporterInntekt,
    decorators: [withIntl, withPageWidth, withDeltakerContext, withRouter, withQueryClient],
    args: {
        rapporteringsperiode: rapporteringsperiode,
    },
};
export default meta;

type Story = StoryObj<typeof RapporterInntekt>;

export const IkkeRapportertPeriode: Story = {
    name: 'Inntekt ikke rapportert',
    args: {
        rapporteringsperiode: {
            ...rapporteringsperiode,
            harRapportert: false,
        },
    },
};

export const RapportertPeriode: Story = {
    name: 'Inntekt rapportert',
    args: {
        rapporteringsperiode: {
            ...rapporteringsperiode,
            harRapportert: true,
            arbeidstakerOgFrilansInntekt: 1500,
            inntektFraYtelse: 0,
            summertInntekt: 1500,
        },
    },
};
