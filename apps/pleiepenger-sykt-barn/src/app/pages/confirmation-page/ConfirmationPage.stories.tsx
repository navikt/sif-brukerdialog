import type { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import ConfirmationPage from './ConfirmationPage';

const meta: Meta<typeof ConfirmationPage> = {
    title: 'Pages/ConfirmationPage',
    component: ConfirmationPage,
    decorators: [withAnalyticsProvider, withIntl],
    args: { onUnmount: () => {} },
    parameters: {
        // layout: 'centered',
    },
};
export default meta;

type Story = StoryObj<typeof ConfirmationPage>;

export const Default: Story = {};
