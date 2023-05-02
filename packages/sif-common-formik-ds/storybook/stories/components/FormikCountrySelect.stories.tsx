import { Meta, StoryFn } from '@storybook/react';
import FormikCountrySelect from '../../../src/components/formik-country-select/FormikCountrySelect';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';

const meta: Meta<typeof FormikCountrySelect> = {
    title: 'Component/FormikCountrySelect',
    component: FormikCountrySelect,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikCountrySelect> = (args) => <FormikCountrySelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikCountrySelect',
    name: 'country',
    value: 'abc',
};
Default.parameters = {
    formik: {
        initialValues: {
            country: 'FLK',
        },
    },
};
