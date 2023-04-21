import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikTextField from '../../../src/components/formik-text-field/FormikTextField';

export default {
    title: 'Component/FormikTextField',
    component: FormikTextField,
    decorators: [withFormikWrapper],
} as Meta<typeof FormikTextField>;

const Template: StoryFn<typeof FormikTextField> = (args) => <FormikTextField {...args} />;

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
