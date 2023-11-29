import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import KontaktOss from './KontaktOss';

import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof KontaktOss> = {
    component: KontaktOss,
    title: 'Components/KontaktOss',
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof KontaktOss>;

export const Default: Story = {
    args: {},
};
