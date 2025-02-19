import type { Meta, StoryObj } from '@storybook/react';
import FremhevetInntektsperiode from './FremhevetInntektsperiode';
import { Rapporteringsperiode } from '../../../../api/types';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../../storybook/decorators/withPageWidth';

const rapporteringsperiode: Rapporteringsperiode = {
    harRapportert: true,
    kanRapportere: true,
    fristForRapportering: ISODateToDate('2025-01-31'),
    periode: {
        from: ISODateToDate('2025-01-01'),
        to: ISODateToDate('2025-01-31'),
    },
};

const meta: Meta<typeof FremhevetInntektsperiode> = {
    title: 'Komponenter/Fremhevet inntektsperiode',
    component: FremhevetInntektsperiode,
    decorators: [withIntl, withPageWidth],
    args: {
        rapporteringsperiode,
    },
};
export default meta;

type Story = StoryObj<typeof FremhevetInntektsperiode>;

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
                arbeidstakerOgFrilansInntekt: 1500,
                næringsinntekt: 0,
                inntektFraYtelse: 0,
                summertInntekt: 1500,
            },
        },
    },
};
