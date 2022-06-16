import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikCheckbox from '../../../src/components/formik-checkbox/FormikCheckbox';

export default {
    title: 'Component/FormikCheckbox',
    component: FormikCheckbox,
    decorators: [withFormik],
} as ComponentMeta<typeof FormikCheckbox>;

const Template: ComponentStory<typeof FormikCheckbox> = (args) => <FormikCheckbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikCheckbox',
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
