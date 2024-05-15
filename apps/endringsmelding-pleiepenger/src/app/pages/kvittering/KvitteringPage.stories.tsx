import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import KvitteringPage from './KvitteringPage';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitudeProvider';

const meta: Meta<typeof KvitteringPage> = {
    title: 'Pages/KvitteringPage',
    component: KvitteringPage,
    decorators: [withAmplitudeProvider, withIntl],
    args: { onUnmount: () => {} },
    parameters: {
        layout: 'centered',
    },
};
export default meta;

type Story = StoryObj<typeof KvitteringPage>;

export const Default: Story = {};
