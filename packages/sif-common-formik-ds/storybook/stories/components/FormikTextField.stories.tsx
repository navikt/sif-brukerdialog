import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikTextField from '../../../src/components/formik-text-field/FormikTextField';

const meta: Meta<typeof FormikTextField> = {
    title: 'Component/FormikTextField',
    component: FormikTextField,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikTextField> = (args) => <FormikTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikTextField',
    name: 'FormikTextField',
    description: 'Some description i appropriate',
    required: true,
};
Default.parameters = {
    formik: {
        initialValues: {
            FormikTextField: 'inital value',
        },
    },
};
