import type { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import GeneralErrorPage from './GeneralErrorPage';

const meta: Meta<typeof GeneralErrorPage> = {
    title: 'Pages/GeneralErrorPage',
    component: GeneralErrorPage,
    decorators: [withAnalyticsProvider, withIntl],
};
export default meta;

type Story = StoryObj<typeof GeneralErrorPage>;

export const Default: Story = {};
