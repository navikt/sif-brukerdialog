import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import UtenlandsoppholdExample from './UtenlandsoppholdExample';

const meta: Meta<typeof UtenlandsoppholdExample> = {
    component: UtenlandsoppholdExample,
    title: 'Form/Utenlandsopphold',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof UtenlandsoppholdExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <UtenlandsoppholdExample />,
};
