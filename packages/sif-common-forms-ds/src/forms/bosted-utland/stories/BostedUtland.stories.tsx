import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import BostedUtlandExample from './BostedUtlandExample';

const meta: Meta<typeof BostedUtlandExample> = {
    component: BostedUtlandExample,
    title: 'Form/Bosted utland',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof BostedUtlandExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <BostedUtlandExample />,
};
