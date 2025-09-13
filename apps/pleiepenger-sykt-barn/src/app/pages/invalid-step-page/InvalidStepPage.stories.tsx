import type { Meta, StoryObj } from '@storybook/react-vite';
import { withAmplitudeProvider, withIntl, withRouterProvider } from '../../../storybook/decorators';
import InvalidStepPage from './InvalidStepPage';

const meta: Meta<typeof InvalidStepPage> = {
    title: 'Pages/InvalidStepPage',
    component: InvalidStepPage,
    decorators: [withAmplitudeProvider, withIntl, withRouterProvider],
};
export default meta;

type Story = StoryObj<typeof InvalidStepPage>;

export const Default: Story = {};
