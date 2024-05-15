import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import VelkommenPage from './VelkommenPage';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitudeProvider';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';

const meta: Meta<typeof VelkommenPage> = {
    title: 'Pages/VelkommenPage',
    component: VelkommenPage,
    decorators: [withAmplitudeProvider, withIntl, (Story) => withSøknadContextProvider(Story)],
    args: { onUnmount: () => {} },
    parameters: {
        layout: 'centered',
    },
};
export default meta;

type Story = StoryObj<typeof VelkommenPage>;

export const Default: Story = {};
