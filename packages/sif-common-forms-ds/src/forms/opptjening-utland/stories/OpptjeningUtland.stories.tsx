import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import OpptjeningUtlandExample from './OpptjeningUtlandExample';

const meta: Meta<typeof OpptjeningUtlandExample> = {
    component: OpptjeningUtlandExample,
    title: 'Form/OpptjeningUtland',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof OpptjeningUtlandExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <OpptjeningUtlandExample />,
};
