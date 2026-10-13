import { Meta, StoryFn } from '@storybook/react-vite';
import FormikConfirmationCheckbox from '../../../src/components/formik-confirmation-checkbox/FormikConfirmationCheckbox';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';

const meta: Meta<typeof FormikConfirmationCheckbox> = {
    title: 'Component/FormikConfirmationCheckbox',
    component: FormikConfirmationCheckbox,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikConfirmationCheckbox> = (args) => <FormikConfirmationCheckbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikConfirmationCheckbox',
    name: 'formikConfirmationCheckbox',
    value: 'abc',
    children: 'This is the description',
};
Default.parameters = {
    formik: {
        initialValues: {
            formikConfirmationCheckbox: false,
        },
    },
};
