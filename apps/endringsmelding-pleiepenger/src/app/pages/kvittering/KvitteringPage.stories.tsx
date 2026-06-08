import type { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import KvitteringPage from './KvitteringPage';

const meta: Meta<typeof KvitteringPage> = {
    title: 'Pages/KvitteringPage',
    component: KvitteringPage,
    decorators: [withAnalyticsProvider, withIntl],
    args: { onUnmount: () => {} },
    parameters: {
        layout: 'centered',
    },
};
export default meta;

type Story = StoryObj<typeof KvitteringPage>;

export const Default: Story = {};
