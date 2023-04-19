import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import FormikCheckbox from '../../../src/components/formik-checkbox/FormikCheckbox';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';

export default {
    title: 'Component/FormikCheckbox',
    component: FormikCheckbox,
    decorators: [withFormikWrapper],
} as Meta<typeof FormikCheckbox>;

const Template: StoryFn<typeof FormikCheckbox> = (args) => <FormikCheckbox {...args} />;

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
