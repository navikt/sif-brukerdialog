import type { Meta, StoryObj } from '@storybook/react';

import { withIntl } from '../../../../../storybook/decorators/withIntl';
import TilsynsordningOppsummering from './TilsynsordningOppsummering';

const meta = {
    title: 'Oppsummering/TilsynsordningOppsummering',
    component: TilsynsordningOppsummering,
    decorators: [withIntl],
} satisfies Meta<typeof TilsynsordningOppsummering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tilsynsordning: {
            perioder: {},
        },
    },
};
