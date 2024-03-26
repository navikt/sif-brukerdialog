import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import FerieuttakExample from './FerieuttakExample';

const meta: Meta<typeof FerieuttakExample> = {
    component: FerieuttakExample,
    title: 'Form/Ferieuttak',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof FerieuttakExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <FerieuttakExample />,
};
