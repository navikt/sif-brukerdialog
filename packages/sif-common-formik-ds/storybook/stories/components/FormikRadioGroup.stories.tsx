import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikRadioGroup, { FormikRadioGroupProps } from '../../../src/components/formik-radio-group/FormikRadioGroup';
import { mockAnimalOptions } from '../../mock-data';

export default {
    title: 'Component/FormikRadioGroup',
    component: FormikRadioGroup,
    decorators: [withFormikWrapper],
} as Meta<typeof FormikRadioGroup>;

const Template: StoryFn<typeof FormikRadioGroup> = (args) => <FormikRadioGroup {...args} />;

export const Default = Template.bind({});
const defaultArgs: FormikRadioGroupProps<any, any> = {
    legend: 'Choose one or more animals',
    description: 'Choose any animal except the catty one',
    name: 'animals',
    radios: mockAnimalOptions,
};

Default.args = {
    ...defaultArgs,
};
Default.parameters = {
    formik: {
        initialValues: {
            FormikRadioGroup: ['dog'],
        },
    },
};
