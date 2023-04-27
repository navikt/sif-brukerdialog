import { Meta, StoryFn } from '@storybook/react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikFileInput from '../../../src/components/formik-file-input/FormikFileInput';

const meta: Meta<typeof FormikFileInput> = {
    title: 'Component/FormikFileInput',
    component: FormikFileInput,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikFileInput> = (args) => (
    <>
        <FormikFileInput {...args} buttonLabel="Last opp fil" />
    </>
);

export const Default = Template.bind({});
Default.args = {
    label: 'FormikFileInput',
    name: 'formikCheckbox',
    value: 'abc',
};
Default.parameters = {
    formik: {
        initialValues: {
            formikCheckbox: true,
        },
    },
};
