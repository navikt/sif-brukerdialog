import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import FosterbarnExample from './FosterbarnExample';

const meta: Meta<typeof FosterbarnExample> = {
    component: FosterbarnExample,
    title: 'Form/Fosterbarn',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof FosterbarnExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <FosterbarnExample />,
};
