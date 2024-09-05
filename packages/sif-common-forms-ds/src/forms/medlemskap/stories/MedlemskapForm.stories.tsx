import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import MedlemskapFormExample from './MedlemskapFormExample';

const meta: Meta<typeof MedlemskapFormExample> = {
    component: MedlemskapFormExample,
    title: 'Form/MedlemskapForm',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof MedlemskapFormExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <MedlemskapFormExample />,
};
