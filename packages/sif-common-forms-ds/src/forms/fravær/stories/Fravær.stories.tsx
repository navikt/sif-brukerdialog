import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import FraværExample from './FraværExample';

const meta: Meta<typeof FraværExample> = {
    component: FraværExample,
    title: 'Form/Fravær',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof FraværExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <FraværExample />,
};
