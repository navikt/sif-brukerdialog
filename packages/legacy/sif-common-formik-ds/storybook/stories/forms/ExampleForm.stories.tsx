import { Meta, StoryFn } from '@storybook/react-vite';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import ExampleForm from './ExampleForm';

const meta: Meta<typeof ExampleForm> = {
    title: 'Example/ExampleForm',
    component: ExampleForm,
    decorators: [withIntl, withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof ExampleForm> = (args) => <ExampleForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'ExampleForm',
    name: 'ExampleForm',
    value: 'abc',
};
Default.parameters = {
    formik: {
        initialValues: {
            ExampleForm: true,
        },
    },
};
