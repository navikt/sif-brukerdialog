import { Meta, StoryFn } from '@storybook/react-vite';
import FormikTextarea from '../../../src/components/formik-textarea/FormikTextarea';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';

const meta: Meta<typeof FormikTextarea> = {
    title: 'Component/FormikTextarea',
    component: FormikTextarea,
    decorators: [withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikTextarea> = (args) => <FormikTextarea {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'FormikTextarea',
    name: 'FormikTextarea',
    description: 'Some description i appropriate',
    required: true,
};
Default.parameters = {
    formik: {
        initialValues: {
            FormikTextarea: 'inital value',
        },
    },
};
