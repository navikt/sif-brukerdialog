import type { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../storybook/decorators/withIntl';
import ConfirmationPage from './ConfirmationPage';

const meta: Meta<typeof ConfirmationPage> = {
    title: 'Pages/ConfirmationPage',
    component: ConfirmationPage,
    decorators: [withAmplitudeProvider, withIntl],
    args: { onUnmount: () => {} },
    parameters: {
        // layout: 'centered',
    },
};
export default meta;

type Story = StoryObj<typeof ConfirmationPage>;

export const Default: Story = {};
