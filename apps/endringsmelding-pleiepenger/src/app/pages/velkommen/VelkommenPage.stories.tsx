import type { Meta, StoryObj } from '@storybook/react-vite';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitudeProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';
import VelkommenPage from './VelkommenPage';

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
