import { Meta, StoryFn } from '@storybook/react-vite';
import * as React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikTimeInput from '../../../src/components/formik-time-input/FormikTimeInput';

const meta: Meta<typeof FormikTimeInput> = {
    title: 'Component/FormikTimeInput',
    component: FormikTimeInput,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikTimeInput> = (args) => <FormikTimeInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikTimeInput',
    name: 'time',
};
Default.parameters = {
    formik: {
        initialValues: {
            time: { hours: '2', minutes: '10' },
        },
    },
};
