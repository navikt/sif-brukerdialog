import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import FormikCountrySelect from '../../../src/components/formik-country-select/FormikCountrySelect';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';

export default {
    title: 'Component/FormikCountrySelect',
    component: FormikCountrySelect,
    decorators: [withFormikWrapper],
} as Meta<typeof FormikCountrySelect>;

const Template: StoryFn<typeof FormikCountrySelect> = (args) => <FormikCountrySelect {...args} />;

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
