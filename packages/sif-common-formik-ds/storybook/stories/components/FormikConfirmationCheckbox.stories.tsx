import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikConfirmationCheckbox from '../../../src/components/formik-confirmation-checkbox/FormikConfirmationCheckbox';

export default {
    title: 'Component/FormikConfirmationCheckbox',
    component: FormikConfirmationCheckbox,
    decorators: [withFormikWrapper],
} as Meta<typeof FormikConfirmationCheckbox>;

const Template: StoryFn<typeof FormikConfirmationCheckbox> = (args) => <FormikConfirmationCheckbox {...args} />;

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
