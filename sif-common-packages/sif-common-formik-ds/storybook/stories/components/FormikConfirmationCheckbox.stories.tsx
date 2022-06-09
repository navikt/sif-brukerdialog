import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikConfirmationCheckbox from '../../../src/components/formik-confirmation-checkbox/FormikConfirmationCheckbox';

export default {
    title: 'Component/FormikConfirmationCheckbox',
    component: FormikConfirmationCheckbox,
    decorators: [withFormik],
} as ComponentMeta<typeof FormikConfirmationCheckbox>;

const Template: ComponentStory<typeof FormikConfirmationCheckbox> = (args) => <FormikConfirmationCheckbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikConfirmationCheckbox',
    name: 'formikConfirmationCheckbox',
    value: 'abc',
    children: 'This is the description',
};
Default.parameters = {
    formik: {
        initialValues: {
            formikConfirmationCheckbox: false,
        },
    },
};
