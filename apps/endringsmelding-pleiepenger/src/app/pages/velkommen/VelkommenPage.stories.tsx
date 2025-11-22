import type { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';
import VelkommenPage from './VelkommenPage';

const meta: Meta<typeof VelkommenPage> = {
    title: 'Pages/VelkommenPage',
    component: VelkommenPage,
    decorators: [withAnalyticsProvider, withIntl, (Story) => withSøknadContextProvider(Story)],
    args: { onUnmount: () => {} },
    parameters: {
        layout: 'centered',
    },
};
export default meta;

type Story = StoryObj<typeof VelkommenPage>;

export const Default: Story = {};
