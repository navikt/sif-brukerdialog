import { Meta, StoryObj } from '@storybook/react';
import FormikCombobox from '../../../src/components/formik-combobox/FormikCombobox';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';

const options_: { label: string; value: string }[] = [
    { label: 'Oslo', value: '1' },
    { label: 'Bergen', value: '2' },
    { label: 'Trondheim', value: '3' },
];

const options: string[] = ['Oslo', 'Bergen', 'Trondheim'];

const meta: Meta<typeof FormikCombobox> = {
    title: 'Component/FormikCombobox',
    component: FormikCombobox,
    decorators: [withFormikWrapper],
};

export default meta;

type Story = StoryObj<typeof FormikCombobox>;

export const Default: Story = {
    name: 'Default',
    args: {
        options,
        value: '',
        allowNewValues: true,
    },
};
