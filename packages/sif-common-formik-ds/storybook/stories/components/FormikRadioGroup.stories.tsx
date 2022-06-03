import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikRadioGroup, { FormikRadioGroupProps } from '../../../src/components/formik-radio-group/FormikRadioGroup';
import { mockAnimalOptions } from '../../mock-data';

export default {
    title: 'Component/FormikRadioGroup',
    component: FormikRadioGroup,
    decorators: [withFormik],
} as ComponentMeta<typeof FormikRadioGroup>;

const Template: ComponentStory<typeof FormikRadioGroup> = (args) => <FormikRadioGroup {...args} />;

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
