import Snarveier from './Snarveier';
import type { Meta, StoryObj } from '@storybook/react';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';

const meta: Meta<typeof Snarveier> = {
    component: Snarveier,
    title: 'Content/Snarveier',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof Snarveier>;

export const Default: Story = {
    args: {},
};
