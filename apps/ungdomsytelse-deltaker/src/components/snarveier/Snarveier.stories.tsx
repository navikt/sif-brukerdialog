import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import Snarveier from './Snarveier';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Snarveier> = {
    component: Snarveier,
    title: 'Content/Snarveier',
    parameters: {
        layout: 'centered',
    },
    decorators: [withPageWidth],
};
export default meta;

type Story = StoryObj<typeof Snarveier>;

export const Default: Story = {
    args: {},
};
