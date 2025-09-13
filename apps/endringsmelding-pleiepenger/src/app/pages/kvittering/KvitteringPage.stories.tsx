import type { Meta, StoryObj } from '@storybook/react-vite';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitudeProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import KvitteringPage from './KvitteringPage';

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
