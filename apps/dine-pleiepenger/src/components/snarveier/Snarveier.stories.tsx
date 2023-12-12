import Snarveier from './Snarveier';
import type { Meta, StoryObj } from '@storybook/react';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';

const meta: Meta<typeof Snarveier> = {
    component: Snarveier,
    title: 'Components/Snarveier',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof Snarveier>;

export const Default: Story = {
    args: {},
};
