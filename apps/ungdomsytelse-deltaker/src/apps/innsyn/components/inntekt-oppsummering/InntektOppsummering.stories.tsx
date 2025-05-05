import type { Meta, StoryObj } from '@storybook/react';

import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../../storybook/decorators/withPageWidth';
import InntektOppsummering from './InntektOppsummering';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';

const meta: Meta<typeof InntektOppsummering> = {
    title: 'Komponenter/Inntektsoppsummering',
    component: InntektOppsummering,
    decorators: [withIntl, withPageWidth],
    args: {
        periode: ISODateRangeToDateRange('2024-01-01/2024-12-31'),
        inntekt: {
            arbeidOgFrilansInntekter: 123,
        },
    },
};
export default meta;

type Story = StoryObj<typeof InntektOppsummering>;

export const Default: Story = {};
