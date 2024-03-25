import HvaSkjer from './HvaSkjer';
import type { Meta, StoryObj } from '@storybook/react';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';

const meta: Meta<typeof HvaSkjer> = {
    component: HvaSkjer,
    title: 'Content/HvaSkjer',
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof HvaSkjer>;

export const Default: Story = {
    args: {},
};
