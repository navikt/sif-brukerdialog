import type { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../storybook/decorators/withIntl';
import UnavailablePage from './UnavailablePage';

const meta: Meta<typeof UnavailablePage> = {
    title: 'Pages/UnavailablePage',
    component: UnavailablePage,
    decorators: [withAmplitudeProvider, withIntl],
};
export default meta;

type Story = StoryObj<typeof UnavailablePage>;

export const Default: Story = {};
