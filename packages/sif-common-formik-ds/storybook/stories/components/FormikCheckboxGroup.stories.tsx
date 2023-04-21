import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import FormikCheckboxGroup from '../../../src/components/formik-checkbox-group/FormikCheckboxGroup';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { mockAnimalOptions, MockAnimals } from '../../mock-data';

export default {
    title: 'Component/FormikCheckboxGroup',
    component: FormikCheckboxGroup,
    decorators: [withFormikWrapper],
} as Meta<typeof FormikCheckboxGroup> as any;

const Template: StoryFn<typeof FormikCheckboxGroup> = (args) => <FormikCheckboxGroup {...args} />;

const fieldName = 'animals';

export const Default = Template.bind({});

Default.args = {
    legend: 'Choose one or more animals',
    description: 'Choose any animal except the catty one',
    name: fieldName,
    checkboxes: mockAnimalOptions,
};
Default.parameters = {
    formik: {
        initialValues: {
            [fieldName]: [],
        },
    },
};

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
    legend: 'Choose one or more animals',
    description: 'The correct choice is set',
    name: fieldName,
    checkboxes: mockAnimalOptions,
};
WithInitialValues.parameters = {
    formik: {
        initialValues: {
            [fieldName]: [MockAnimals.dog],
        },
    },
};
