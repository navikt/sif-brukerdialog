import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikInputGroup from '../../../src/components/formik-input-group/FormikInputGroup';

export default {
    title: 'Component/FormikInputGroup',
    component: FormikInputGroup,
    decorators: [withFormik],
} as ComponentMeta<typeof FormikInputGroup>;

const Template: ComponentStory<typeof FormikInputGroup> = (args) => <FormikInputGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
    legend: 'FormikInputGroup',
    name: 'FormikInputGroup',
    description: 'Some description i appropriate',
};
Default.parameters = {
    formik: {},
};
