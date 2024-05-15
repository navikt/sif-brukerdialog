import type { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../storybook/decorators/withIntl';
import GeneralErrorPage from './GeneralErrorPage';

const meta: Meta<typeof GeneralErrorPage> = {
    title: 'Pages/GeneralErrorPage',
    component: GeneralErrorPage,
    decorators: [withAmplitudeProvider, withIntl],
};
export default meta;

type Story = StoryObj<typeof GeneralErrorPage>;

export const Default: Story = {};
