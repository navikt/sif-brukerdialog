import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import FormikNumberInput from '../../../src/components/formik-number-input/FormikNumberInput';
import getNumberValidator from '../../../src/validation/getNumberValidator';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';

const meta: Meta<typeof FormikNumberInput> = {
    title: 'Component/FormikNumberInput',
    component: FormikNumberInput,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikNumberInput> = (args) => (
    <FormikNumberInput
        {...args}
        validate={getNumberValidator({
            min: 0,
            max: 200000,
            allowDecimals: false,
        })}
    />
);

export const Default = Template.bind({});
Default.args = {
    label: 'FormikNumberInput',
    name: 'FormikNumberInput',
    description: 'Some description i appropriate',
};
Default.parameters = {
    formik: {
        initialValues: {
            FormikNumberInput: '100.000',
        },
    },
};
