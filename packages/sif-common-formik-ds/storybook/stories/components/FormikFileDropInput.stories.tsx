import { Meta, StoryFn } from '@storybook/react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikFileDropInput from '../../../src/components/formik-file-drop-input/FormikFileDropInput';

const meta: Meta<typeof FormikFileDropInput> = {
    title: 'Component/FormikFileDropInput',
    component: FormikFileDropInput,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikFileDropInput> = (args) => (
    <>
        <FormikFileDropInput {...args} buttonLabel="Last opp fil" />
    </>
);

export const Default = Template.bind({});
Default.args = {
    label: 'FormikFileDropInput',
    name: 'formikCheckbox',
    value: 'abc',
    onFilesSelect: (files: any) => {
        // eslint-disable-next-line no-console
        console.log(files);
    },
};
Default.parameters = {
    formik: {
        initialValues: {
            formikCheckbox: true,
        },
    },
};
