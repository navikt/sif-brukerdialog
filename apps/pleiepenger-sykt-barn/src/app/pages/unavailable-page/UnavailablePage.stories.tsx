import type { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import UnavailablePage from './UnavailablePage';

const meta: Meta<typeof UnavailablePage> = {
    title: 'Pages/UnavailablePage',
    component: UnavailablePage,
    decorators: [withAnalyticsProvider, withIntl],
};
export default meta;

type Story = StoryObj<typeof UnavailablePage>;

export const Default: Story = {};
