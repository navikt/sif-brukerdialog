import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikTimeInput from '../../../src/components/formik-time-input/FormikTimeInput';

export default {
    title: 'Component/FormikTimeInput',
    component: FormikTimeInput,
    decorators: [withFormik],
} as ComponentMeta<typeof FormikTimeInput>;

const Template: ComponentStory<typeof FormikTimeInput> = (args) => <FormikTimeInput {...args} />;

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
