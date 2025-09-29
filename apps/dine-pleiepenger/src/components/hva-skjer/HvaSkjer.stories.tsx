import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import HvaSkjer from './HvaSkjer';

import type { Meta, StoryObj } from '@storybook/react-vite';
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
