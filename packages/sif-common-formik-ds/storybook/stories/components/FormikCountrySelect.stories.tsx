import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import FormikCountrySelect from '../../../src/components/formik-country-select/FormikCountrySelect';
import withFormik from 'storybook-formik';

export default {
    title: 'Component/FormikCountrySelect',
    component: FormikCountrySelect,
    decorators: [withFormik],
} as ComponentMeta<typeof FormikCountrySelect>;

const Template: ComponentStory<typeof FormikCountrySelect> = (args) => <FormikCountrySelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikCountrySelect',
    name: 'country',
    value: 'abc',
};
Default.parameters = {
    formik: {
        initialValues: {
            country: 'FLK',
        },
    },
};
