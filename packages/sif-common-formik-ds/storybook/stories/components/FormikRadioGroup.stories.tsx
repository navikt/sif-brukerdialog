import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikRadioGroup, { FormikRadioGroupProps } from '../../../src/components/formik-radio-group/FormikRadioGroup';
import { mockAnimalOptions } from '../../mock-data';

const meta: Meta<typeof FormikRadioGroup> = {
    title: 'Component/FormikRadioGroup',
    component: FormikRadioGroup,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikRadioGroup> = (args) => <FormikRadioGroup {...args} />;

export const Default = Template.bind({});
const defaultArgs: FormikRadioGroupProps<any, any> = {
    legend: 'Choose one or more animals',
    description: 'Choose any animal except the catty one',
    name: 'animals',
    radios: mockAnimalOptions,
    required: true,
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
