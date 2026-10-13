import { Meta, StoryFn } from '@storybook/react-vite';
import FormikCheckbox from '../../../src/components/formik-checkbox/FormikCheckbox';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';

const meta: Meta<typeof FormikCheckbox> = {
    title: 'Component/FormikCheckbox',
    component: FormikCheckbox,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikCheckbox> = (args) => <FormikCheckbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikCheckbox',
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
