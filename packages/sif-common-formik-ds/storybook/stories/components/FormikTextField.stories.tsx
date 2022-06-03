import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikTextField from '../../../src/components/formik-text-field/FormikTextField';

export default {
    title: 'Component/FormikTextField',
    component: FormikTextField,
    decorators: [withFormik],
} as ComponentMeta<typeof FormikTextField>;

const Template: ComponentStory<typeof FormikTextField> = (args) => <FormikTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikTextField',
    name: 'FormikTextField',
    description: 'Some description i appropriate',
};
Default.parameters = {
    formik: {
        initialValues: {
            FormikTextField: 'inital value',
        },
    },
};
