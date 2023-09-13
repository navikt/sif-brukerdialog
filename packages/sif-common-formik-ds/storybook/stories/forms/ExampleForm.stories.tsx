import { Meta, StoryFn } from '@storybook/react';
// import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import ExampleForm from './ExampleForm';
import { withIntl } from '../../decorators/withIntl';

const meta: Meta<typeof ExampleForm> = {
    title: 'Example/ExampleForm',
    component: ExampleForm,
    decorators: [withIntl],
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
