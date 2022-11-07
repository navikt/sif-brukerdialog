import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikFileInput from '../../../src/components/formik-file-input/FormikFileInput';

export default {
    title: 'Component/FormikFileInput',
    component: FormikFileInput,
    decorators: [withFormik],
} as ComponentMeta<typeof FormikFileInput>;

const Template: ComponentStory<typeof FormikFileInput> = (args) => (
    <>
        <FormikFileInput {...args} buttonLabel="Last opp fil" />
    </>
);

export const Default = Template.bind({});
Default.args = {
    label: 'FormikFileInput',
    name: 'formikCheckbox',
    value: 'abc',
};
Default.parameters = {
    formik: {
        initialValues: {
            formikCheckbox: true,
        },
    },
};
