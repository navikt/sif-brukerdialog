import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikInputGroup from '../../../src/components/formik-input-group/FormikInputGroup';

const meta: Meta<typeof FormikInputGroup> = {
    title: 'Component/FormikInputGroup',
    component: FormikInputGroup,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikInputGroup> = (args) => <FormikInputGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
    legend: 'FormikInputGroup',
    name: 'FormikInputGroup',
    description: 'Some description i appropriate',
};
Default.parameters = {
    formik: {},
};
