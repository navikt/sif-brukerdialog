import SnarveierSak from './SnarveierSak';
import type { Meta, StoryObj } from '@storybook/react';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';

const meta: Meta<typeof SnarveierSak> = {
    component: SnarveierSak,
    title: 'Content/SnarveierSak',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof SnarveierSak>;

export const Default: Story = {
    args: {},
};
